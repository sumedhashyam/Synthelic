import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { HeaderComponent } from './_components/header.component';
import { AlertComponent } from './_components/alert.component';
import { LoginComponent } from './account/login.component';
import { SignupComponent } from './account/signup.component';
import { TrendComponent } from './trend/trend.component';
import { ExperienceComponent } from './experience/experience.component';
import { FilterComponent } from './filter/filter.component';
import { ModalModule } from './_modal';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
    HomeComponent,
    CreateComponent,
    LoginComponent,
    SignupComponent,
    TrendComponent,
    ExperienceComponent,    
    FilterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteLibModule,
    ModalModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
