import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario: Usuario = { username: '', password: '' };

  constructor(private _authService: AuthService, private router: Router) { }

  loginUser() {
    this._authService.login(this.usuario).subscribe({
      next: (response) => {
        const token = response.headers.get('Authorization');
        console.log('Token de Autorización guardado en el servicio:', token);
    
        if (token) {
          this._authService.setToken(token);
          console.log('Token de Autorización guardado en el servicio:', token);
          this.router.navigate(['pages/']);
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    });
    
  }
}
