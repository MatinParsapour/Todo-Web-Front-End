import { UserManagementUserDetailsComponent } from './components/user-management-user-details/user-management-user-details.component';
import { UserManangementComponent } from './components/user-manangement/user-manangement.component';
import { OutboxComponent } from './components/outbox/outbox.component';
import { InboxComponent } from './components/inbox/inbox.component';
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
  {path: 'main', component: MainComponent},
  {path: 'reset-email', component: ResetEmailComponent},
  {path: 'inbox', component: InboxComponent},
  {path: 'outbox', component: OutboxComponent},
  {path: 'user-management', component: UserManangementComponent},
  {path: 'observe-user', component: UserManagementUserDetailsComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
