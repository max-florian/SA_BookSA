import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { LibreriaComponent } from './components/libreria/libreria.component';
import { BookComponent } from './components/libreria/book/book.component';
import { AddbookComponent } from './components/libreria/book/addbook/addbook.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'libreria', component: LibreriaComponent },
  { path: 'libreria/book/addbook',component:AddbookComponent},
  { path: 'libreria/book/:idLibro',component:BookComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
