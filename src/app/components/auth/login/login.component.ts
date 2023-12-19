import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onNgInit() {
    this.form.reset({ user: '', password: '' });
  }

  onSubmit(): void {
    if (!this.form || !this.form.valid) {
      return;
    }

    const formValues = this.form.value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, formValues.user, formValues.password)
      .then((result) => {
        // Obtengo el token ID para validar en el back
        result.user.getIdToken().then((value) => {
          // Guardo el token en storage
          localStorage.setItem('tokenId', value);
          // Usuario autenticado
          this.router.navigate(['']);
        });
      })
      .catch((error) => {
        // Error al autenticar
        const errorCode = error.code;

        if (errorCode === 'auth/invalid-credential') {
          // Usuario o password ingresado no valido.
          alert(
            'El usuario o la contraseña ingresada es incorrecta. Intente nuevamente.'
          );
          return;
        }

        alert(
          'Ha ocurrido un error al intentar autenticar el usuario. Reintente mas tarde o comuniquese con el administrador.'
        );
      });
  }

  onRegistrarClick(): void {
    this.router.navigate(['registrar']);
  }
}
