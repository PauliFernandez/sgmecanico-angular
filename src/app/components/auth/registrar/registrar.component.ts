import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent {
  form: FormGroup;
  alertMessage: string = '';
  alertTitle: string = 'Error al registrar';
  alertSuccess: boolean = false;

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
    createUserWithEmailAndPassword(auth, formValues.user, formValues.password)
      .then(() => {
        // Usuario registrado
        this.alertSuccess = true;
        this.alertTitle = 'Registro exitoso';
        this.alertMessage = 'Se ha registrado exitosamente.';
      })
      .catch((error) => {
        this.alertSuccess = false;
        this.alertTitle = 'Error al registrar';

        if (error.code === 'auth/email-already-in-use') {
          this.alertMessage = 'El correo ingresado ya se encuentra registrado.';
          return;
        }
        this.alertMessage =
          'Ha ocurrido un error al intentar registrar el usuario. Reintente mas tarde o comuniquese con el administrador.';
      });
  }

  onVolverClick(): void {
    this.router.navigate(['login']);
  }

  onCerrarAlertaClick(): void {
    this.alertMessage = '';
    if (this.alertSuccess) {
      this.router.navigate(['login']);
    }
  }
}
