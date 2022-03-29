import { SupportService } from './services/support/support.service';
import { UserManagementService } from './services/user-management/user-management.service';
import { EmailDetailsService } from './services/emai-details/email-details.service';
import { OutboxService } from './services/email-service/outbox/outbox.service';
import { InboxService } from './services/email-service/inbox/inbox.service';
import { SendEmailService } from './services/send-email/send-email.service';
import { PhoneNumberService } from './services/phone-number/phone-number.service';
import { UserService } from './services/user/user.service';
import { ToDoService } from './services/to-do/to-do.service';
import { InsertFolderService } from './services/insert-folder/insert-folder.service';
import { MainService } from './services/main/main.service';
import { LoginService } from './services/login/login.service';
import { ForgetPasswordService } from './services/forget-password/forget-password.service';
import { RegisterService } from './services/register/register.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { MainComponent } from './components/main/main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InsertFolderComponent } from './components/insert-folder/insert-folder.component';
import { InsertListComponent } from './components/insert-list/insert-list.component';
import { ToDoFoldersComponent } from './components/to-do-folders/to-do-folders.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { UserComponent } from './components/user/user.component';
import { AggreementComponent } from './components/aggreement/aggreement.component';
import { EditToDoComponent } from './components/edit-to-do/edit-to-do.component';
import { PhoneNumberComponent } from './components/phone-number/phone-number.component';
import { CodeValidatorComponent } from './components/code-validator/code-validator.component';
import { ResetEmailComponent } from './components/reset-email/reset-email.component';
import { GetResetEmailComponent } from './components/get-reset-email/get-reset-email.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ToDoPicturesComponent } from './components/to-do-pictures/to-do-pictures.component';
import { ToDoPictureComponent } from './components/to-do-picture/to-do-picture.component';
import { SummaryPipesPipe } from './pipes/summary-pipes.pipe';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { CategoryComponent } from './components/category/category.component';
import { MarkerPipe } from './pipes/marker.pipe';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';
import { FacebookSignInComponent } from './components/facebook-sign-in/facebook-sign-in.component';
import { StarComponent } from './components/star/star.component';
import { CheckCircleComponent } from './components/check-circle/check-circle.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { OutboxComponent } from './components/outbox/outbox.component';
import { EmailDetailsComponent } from './components/email-details/email-details.component';
import { UserManangementComponent } from './components/user-manangement/user-manangement.component';
import { UsersComponent } from './components/users/users.component';
import { UserManagementUserDetailsComponent } from './components/user-management-user-details/user-management-user-details.component';
import { CutterPipe } from './pipes/cutter.pipe';
import { ReplacerPipe } from './pipes/replacer.pipe';
import { SupportComponent } from './components/support/support.component';
import { NewTopicComponent } from './components/new-topic/new-topic.component';
import { MessageComponent } from './components/message/message.component';

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
    PhoneNumberComponent,
    CodeValidatorComponent,
    ResetEmailComponent,
    GetResetEmailComponent,
    ToDoPicturesComponent,
    ToDoPictureComponent,
    SummaryPipesPipe,
    ImageViewerComponent,
    CategoryComponent,
    MarkerPipe,
    SignInComponent,
    GoogleSignInComponent,
    FacebookSignInComponent,
    StarComponent,
    CheckCircleComponent,
    SendEmailComponent,
    InboxComponent,
    OutboxComponent,
    EmailDetailsComponent,
    UserManangementComponent,
    UsersComponent,
    UserManagementUserDetailsComponent,
    CutterPipe,
    ReplacerPipe,
    SupportComponent,
    NewTopicComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    NgxCaptchaModule,
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
    MatTabsModule,
    NgImageSliderModule,
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
    PhoneNumberService,
    SocialAuthService,
    SendEmailService,
    InboxService,
    OutboxService,
    EmailDetailsService,
    UserManagementService,
    SupportService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '124532971602-7m28ejks02ms2gickoqapu97bnuak9dl.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('631558524611136'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
