import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent} from "../app/create/create.component";
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
    path: "create",
    component: CreateComponent,
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
