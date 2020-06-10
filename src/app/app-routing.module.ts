import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from "./create/create.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './account/login.component';
import { SignupComponent } from './account/signup.component';
import { TrendComponent } from './trend/trend.component';
import { ExperienceComponent } from './experience/experience.component';

const routes: Routes = [
  { path: '', component: TrendComponent },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'trends', component: TrendComponent },
  { path: 'experiences', component: ExperienceComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
