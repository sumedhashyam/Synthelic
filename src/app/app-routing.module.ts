import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePageComponent} from "../app/createpage/createpage.component";
import {HomePageComponent} from "../app/home-page/home-page.component";


const routes: Routes = [
  {
    path: "",
    redirectTo: "/home-page",
    pathMatch: "full"
  },
  {
    path: "home-page",
    component: HomePageComponent,
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
