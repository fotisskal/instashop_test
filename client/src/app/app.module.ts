import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { LandmarksComponent } from './landmarks/landmarks.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AgmCoreModule } from '@agm/core';
import { EditComponent } from './edit/edit.component';
import { AlertComponent } from './alert/alert.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {environment} from "../environments/environment";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandmarksComponent,
    LoginComponent,
    EditComponent,
    AlertComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      NgbModule,
      ReactiveFormsModule,
      AgmCoreModule.forRoot({
          apiKey: `${environment.googleMapsKey}`, //API key for Google Maps
          libraries: ['places']
      }),
      NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
