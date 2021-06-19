import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { LibreriaComponent } from './components/libreria/libreria.component';
import { BookComponent } from './components/libreria/book/book.component';
import { AddbookComponent } from './components/libreria/book/addbook/addbook.component';
import { OrdenComponent } from './components/tienda/orden/orden.component';
import { ViewUsersComponent} from './components/view-users/view-users.component'
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'libreria', component: LibreriaComponent },
  { path: 'libreria/book/addbook',component:AddbookComponent},
  { path: 'libreria/book/:idLibro',component:BookComponent},
  { path: 'tienda/ordenes',component:OrdenComponent},
  { path: 'admin', component: ViewUsersComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
