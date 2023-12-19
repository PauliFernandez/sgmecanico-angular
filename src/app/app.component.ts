import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'sgmecanico-angular';
  loggedIn: boolean = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    console.log('auth token id', this.afAuth.idToken);
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((value) => {
          // Guardo el token en storage
          localStorage.setItem('tokenId', value);
        });
      }

      this.loggedIn = !!user;
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('tokenId');
      this.router.navigate(['login']);
    });
  }
}
