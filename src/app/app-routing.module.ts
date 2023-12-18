import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RectificadoComponent } from './components/gestion-rectificados/rectificado/rectificado.component';
import { ModuloOperarioComponent } from './components/gestion-rectificados/modulo-operario/modulo-operario.component';
import { UpdateMotorComponent } from './components/gestion-rectificados/modulo-operario/update-motor/update-motor.component';
import { PedidoComponent } from './components/gestion-rectificados/pedido/pedido.component';
import { AltaPedidoComponent } from './components/gestion-rectificados/pedido/alta-pedido/alta-pedido.component';
import { LoginComponent } from './components/auth/login/login.component';
import { GestionVentasComponent } from './components/gestion-ventas/gestion-ventas.component';
import { GestionEnviosComponent } from './components/gestion-envios/gestion-envios.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { GestionGruposComponent } from './components/gestion-grupos/gestion-grupos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/rectificados',
    pathMatch: 'full'
  },
  { path: 'rectificados', component: RectificadoComponent },
  {
    path: 'moduloOperarios', component: ModuloOperarioComponent, children: [
    ]
  },
  { path: 'updateMotor', component: UpdateMotorComponent },
  { path: 'pedidos', component: PedidoComponent },
  { path: 'alta-pedido', component: AltaPedidoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ventas', component: GestionVentasComponent },
  { path: 'envios', component: GestionEnviosComponent },
  { path: 'usuarios', component: GestionUsuariosComponent },
  { path: 'grupos', component: GestionGruposComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
