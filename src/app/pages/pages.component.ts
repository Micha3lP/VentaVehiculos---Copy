import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
 menuItems = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: '/pages/ventas' },
    { label: 'Vehículos', icon: 'pi pi-car', routerLink: '/pages/vehiculos' },
    { label: 'Clientes', icon: 'pi pi-users', routerLink: '/pages/cliente' }
  ];
}
