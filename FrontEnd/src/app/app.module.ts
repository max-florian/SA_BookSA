import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { LibreriaComponent } from './components/libreria/libreria.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BookComponent } from './components/libreria/book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewUsersComponent } from './components/view-users/view-users.component';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { AddbookComponent } from './components/libreria/book/addbook/addbook.component';
import { OrdenComponent } from './components/tienda/orden/orden.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CatalogoComponent,
    LibreriaComponent,
    NavBarComponent,
    BookComponent,
    AddbookComponent,
    OrdenComponent,
    NavBarComponent,
    ViewUsersComponent,
  ],
  imports: [
    MatButtonModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
