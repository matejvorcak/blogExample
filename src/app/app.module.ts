import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-foundation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CrisisListComponent } from './components/crisis-list/crisis-list.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { AuthDialogComponet, LoginDialogComponent, RegisterDialogComponent, AuthFormsComponent } from "./components/auth-dialog/auth-dialog.component";
import { DemoMaterialModule } from './material.module';

const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes', component: HeroListComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    DemoMaterialModule
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
  ],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent, AuthFormsComponent ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }