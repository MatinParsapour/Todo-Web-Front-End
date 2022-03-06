import { UserService } from './services/user/user.service';
import { ToDoService } from './services/to-do/to-do.service';
import { InsertFolderService } from './services/insert-folder/insert-folder.service';
import { MainService } from './services/main/main.service';
import { LoginService } from './services/login/login.service';
import { ForgetPasswordService } from './services/forget-password/forget-password.service';
import { RegisterService } from './services/register/register.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './components/register/register.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatIconModule} from '@angular/material/icon';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component'
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { MainComponent } from './components/main/main.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { InsertFolderComponent } from './components/insert-folder/insert-folder.component';
import { InsertListComponent } from './components/insert-list/insert-list.component';
import { ToDoFoldersComponent } from './components/to-do-folders/to-do-folders.component';
import { ToDoComponent } from './components/to-do/to-do.component'
import {MatCardModule} from '@angular/material/card'
import {MatTooltipModule} from '@angular/material/tooltip'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { UserComponent } from './components/user/user.component';
import { AggreementComponent } from './components/aggreement/aggreement.component';
import { EditToDoComponent } from './components/edit-to-do/edit-to-do.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ValidateEmailComponent,
    CaptchaComponent,
    ResetPasswordComponent,
    NotFoundComponent,
    MainComponent,
    InsertFolderComponent,
    InsertListComponent,
    ToDoFoldersComponent,
    ToDoComponent,
    UserComponent,
    AggreementComponent,
    EditToDoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientModule,
    MatSidenavModule,
    MatCardModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
  ],
  providers: [
    RegisterService,
    ForgetPasswordService,
    ResetPasswordService,
    LoginService,
    MainService,
    InsertFolderService,
    ToDoService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
