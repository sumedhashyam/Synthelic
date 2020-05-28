import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreatpageComponent} from "../app/creatpage/creatpage.component";


const routes: Routes = [
  {
    path: "creatpage",
    component: CreatpageComponent,
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
