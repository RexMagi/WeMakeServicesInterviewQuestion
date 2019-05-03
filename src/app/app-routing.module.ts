import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReposComponent } from './repos/repos.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'repos', component: ReposComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
