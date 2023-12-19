import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrarComponent } from './components/auth/registrar/registrar.component';
import { RectificadoComponent } from './components/gestion-rectificados/rectificado/rectificado.component';
import { ModuloOperarioComponent } from './components/gestion-rectificados/modulo-operario/modulo-operario.component';
import { PedidoComponent } from './components/gestion-rectificados/pedido/pedido.component';
import { AltaPedidoComponent } from './components/gestion-rectificados/pedido/alta-pedido/alta-pedido.component';
import { GestionVentasComponent } from './components/gestion-ventas/gestion-ventas.component';
import { GestionEnviosComponent } from './components/gestion-envios/gestion-envios.component';
import { UpdateMotorComponent } from './components/gestion-rectificados/modulo-operario/update-motor/update-motor.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RectificadoComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'registrar',
    component: RegistrarComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'rectificados',
    component: RectificadoComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'moduloOperarios',
    component: ModuloOperarioComponent,
    children: [],
  },
  {
    path: 'pedidos',
    component: PedidoComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'alta-pedido',
    component: AltaPedidoComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'ventas',
    component: GestionVentasComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'envios',
    component: GestionEnviosComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'updateMotor',
    component: UpdateMotorComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
