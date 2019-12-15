import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrisisListComponent } from './components/crisis-list/crisis-list.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';



const routes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'her', component: HeroListComponent },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
