import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePageComponent} from "../app/createpage/createpage.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
  } ,
  {
    path: "createpage",
    component: CreatePageComponent,
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
