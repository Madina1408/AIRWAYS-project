import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/services/auth/auth.service';

const routes: Routes = [ {
  path: '',
  loadChildren: () => import('./airways/airways.module').then((m) => m.AirwaysModule),
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
