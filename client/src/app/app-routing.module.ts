import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandmarksComponent } from './landmarks/landmarks.component';
import { LoginComponent } from "./login/login.component";
import {EditComponent} from "./edit/edit.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EditComponent},
  { path: 'landmark/:id', component: LandmarksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
