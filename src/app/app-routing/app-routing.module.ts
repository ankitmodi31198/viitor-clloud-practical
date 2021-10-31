import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
