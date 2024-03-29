import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: '',pathMatch: 'full',redirectTo:'/home'},
  {path:'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(u => u.UserModule)
  },
  { path: '**', redirectTo: '/404' },
  { path: '404', component: ErrorComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
