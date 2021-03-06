import { TagComponent } from './components/tag/tag.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserComponent } from './components/user/user.component';
import { ExploreComponent } from './components/explore/explore.component';
import { SharedToDoComponent } from './components/shared-to-do/shared-to-do.component';
import { ResetEmailComponent } from './components/reset-email/reset-email.component';
import { MainComponent } from './components/main/main.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'validate-email', component: ValidateEmailComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: ':username', component: MainComponent},
  {path: 'reset-email', component: ResetEmailComponent},
  {path: 'to-do', component: SharedToDoComponent},
  {path: 'explore', component: ExploreComponent},
  {path: 'user/:observable', component: UserComponent},
  {path: ':username/settings/:settingsType', component: SettingsComponent},
  {path: 'tag/:name', component: TagComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
