import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-foundation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { CookieService } from "ngx-cookie-service";

import { AppComponent } from './app.component';
import { CrisisListComponent } from './components/crisis-list/crisis-list.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { AuthDialogComponet, LoginDialogComponent, RegisterDialogComponent, AuthFormsComponent } from "./components/auth-dialog/auth-dialog.component";
import { DemoMaterialModule } from './material.module';
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/pages/home/home.component"
import { HeaderComponent } from "./components/header/header.component";
import { NewsComponent } from "./components/news/news.component";

const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes', component: HeroListComponent }, 
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule
  ],
  exports: [

  ],
  declarations: [
    AppComponent,
    HeroListComponent,
    CrisisListComponent,
    AuthDialogComponet,
    AuthFormsComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    NewsComponent
  ],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent, AuthFormsComponent ],
  bootstrap: [AppComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    CookieService
  ]
})
export class AppModule { }