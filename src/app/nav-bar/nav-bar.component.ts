import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  dropdownOptions: any[];

  constructor(public authService: AuthService, private router: Router) {
    this.dropdownOptions = [
      { label: 'Perfil', icon: 'pi pi-user', command: () => { /* Acción al hacer clic */ } },
      { label: 'Configuración', icon: 'pi pi-cog', command: () => { /* Acción al hacer clic */ } },
      { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.cerrarSesion() }
    ];
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    this.authService.deleteToken(); // Limpiar el token almacenado
    this.router.navigate(['/login']); // Redireccionar a la página de inicio de sesión
  }
}