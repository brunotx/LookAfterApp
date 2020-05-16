import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/pages/home/home.component';
import { CarrouselComponent } from './routes/pages/carrousel/carrousel.component';
import { HttpClientModule } from '@angular/common/http';
import { UserAddComponent } from './routes/pages/user-add/user-add.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './routes/pages/login/login.component';
import { UserPageComponent } from './routes/pages/user-page/user-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarrouselComponent,
    UserAddComponent,
    LoginComponent,
    UserPageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  providers: [],
  entryComponents: [UserAddComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
