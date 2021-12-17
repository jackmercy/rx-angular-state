import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'app',
    component: HeroesComponent
  },
  {
    path: 'detail/:id',
    component: HeroProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
