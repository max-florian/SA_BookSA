import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CatalogoComponent } from './components/tienda/catalogo/catalogo.component';
import { LibreriaComponent } from './components/editorial/libreria.component';
import { NavBarComponent } from './components/navigation/nav-bar/nav-bar.component';
import { BookComponent } from './components/editorial/book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { AddbookComponent } from './components/editorial/book/addbook/addbook.component';
import { OrdenComponent } from './components/tienda/orden/orden.component';
import { NavBarEditorialComponent } from './components/navigation/nav-bar-editorial/nav-bar-editorial.component';
import { ProductoComponent } from './components/tienda/catalogo/producto/producto.component';
import { CheckoutComponent } from './components/tienda/checkout/checkout.component';
import { OrdenDetalleComponent } from './components/tienda/checkout/orden-detalle/orden-detalle.component';
import { SolicitudesComponent } from './components/editorial/solicitudes/solicitudes.component';
import { OrdenEditorialComponent } from './components/editorial/orden-editorial/orden-editorial.component';
import { SolicitudComponent } from './components/tienda/solicitud/solicitud.component';
import { CalculadoraComponent } from './components/tienda/calculadora/calculadora.component';
import { BitacoraComponent } from './components/admin/bitacora/bitacora.component';

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
    ProductoComponent,
    NavBarEditorialComponent,
    CheckoutComponent,
    OrdenDetalleComponent,
    SolicitudesComponent,
    OrdenEditorialComponent,
    SolicitudComponent,
    CalculadoraComponent,
    BitacoraComponent,
  ],
  imports: [
    MatButtonModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
