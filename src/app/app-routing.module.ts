import { SettingsComponent } from './settings/settings.component';
import { NoLoginOnlyGuard } from './shared/no-login-only.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoLoginOnlyGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [NoLoginOnlyGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

// imports: [RouterModule.forRoot(routes, { useHash: true })],
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
