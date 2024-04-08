import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './auth.guard';
import { VentaComponent } from './pages/venta/venta.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { ClienteComponent } from './pages/cliente/cliente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'ventas',
        pathMatch: 'full'
      },
      {
        path: 'ventas',
        component: VentaComponent
      },
      {
        path: 'vehiculos',
        component: VehiculoComponent
      },
      {
        path: 'cliente',
        component: ClienteComponent
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
