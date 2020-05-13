import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/pages/home/home.component';
import { CarrouselComponent } from './routes/pages/carrousel/carrousel.component';
import { HttpClientModule } from '@angular/common/http';
import { UserAddComponent } from './routes/pages/user-add/user-add.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarrouselComponent,
    UserAddComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [],
  entryComponents: [UserAddComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
