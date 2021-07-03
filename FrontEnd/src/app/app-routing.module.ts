import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CatalogoComponent } from './components/tienda/catalogo/catalogo.component';
import { LibreriaComponent } from './components/editorial/libreria.component';
import { BookComponent } from './components/editorial/book/book.component';
import { AddbookComponent } from './components/editorial/book/addbook/addbook.component';
import { OrdenComponent } from './components/tienda/orden/orden.component';
import { ViewUsersComponent} from './components/admin/view-users/view-users.component'
import { CheckoutComponent } from './components/tienda/checkout/checkout.component';
import { SolicitudesComponent } from './components/editorial/solicitudes/solicitudes.component';
import { OrdenEditorialComponent } from './components/editorial/orden-editorial/orden-editorial.component';
import { SolicitudComponent } from './components/tienda/solicitud/solicitud.component';
import { CalculadoraComponent } from './components/tienda/calculadora/calculadora.component';
import { BitacoraComponent } from './components/admin/bitacora/bitacora.component';
import { OrdenAdminComponent } from './components/admin/orden-admin/orden-admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'editorial', component: LibreriaComponent },
  { path: 'editorial/book/addbook',component:AddbookComponent},
  { path: 'editorial/book/:idLibro',component:BookComponent},
  { path: 'editorial/solicitudes',component:SolicitudesComponent },
  { path: 'editorial/ordenes',component:OrdenEditorialComponent},
  { path: 'tienda/ordenes',component:OrdenComponent},
  { path: 'tienda/solicitud', component: SolicitudComponent},
  { path: 'tienda/calculadora', component: CalculadoraComponent},
  { path: 'admin', component: ViewUsersComponent},
  { path: 'admin/bitacora', component: BitacoraComponent},
  { path: 'admin/ordenes', component: OrdenAdminComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
