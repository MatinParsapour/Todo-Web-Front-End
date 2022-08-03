import { EditableToDoComponent } from './editable-to-do/editable-to-do.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { TagsComponent } from './components/user-lists/tags/tags.component';
import { RequestsComponent } from './components/user-lists/requests/requests.component';
import { FollowingsComponent } from './components/user-lists/followings/followings.component';
import { FollowersComponent } from './components/user-lists/followers/followers.component';
import { UserListsComponent } from './components/user-lists/user-lists.component';
import { AccountComponent } from './components/settings/account/account.component';
import { SecurityComponent } from './components/settings/security/security.component';
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
import { PersonalInfoComponent } from './components/settings/personal-info/personal-info.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'validate-email', component: ValidateEmailComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: ':username', component: MainComponent },
  { path: 'reset-email', component: ResetEmailComponent },
  { path: 'to-do', component: SharedToDoComponent, children: [
    { path: ':id', component: ToDoComponent},
    { path: ':id/edit', component: EditableToDoComponent}
  ] },
  { path: 'explore', component: ExploreComponent },
  { path: 'user/:observable', component: UserComponent },
  {
    path: ':username/settings',
    component: SettingsComponent,
    children: [
      { path: 'personal-info', component: PersonalInfoComponent },
      { path: 'security-info', component: SecurityComponent },
      { path: 'account-info', component: AccountComponent },
    ],
  },
  {
    path: ':username',
    component: UserListsComponent,
    children: [
      { path: 'followers', component: FollowersComponent },
      { path: 'followings', component: FollowingsComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'tags', component: TagsComponent },
    ],
  },
  { path: 'tag/:name', component: TagComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
