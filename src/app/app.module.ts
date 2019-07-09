import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppraisalPageComponent} from './home-page/appraisal-page.component';
import {HeaderComponent} from './header/header.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {NewSheetPageComponent} from './project-evaluation-page/new-sheet-page.component';
import {ArchivePageComponent} from './archive-page/archive-page.component';
import {UserComponent} from './user-page/user.component';
import {UserGroupComponent} from './user-page/user-group-page/user-group.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './service/login.service';
import {NgFlashMessageService, NgFlashMessagesModule} from 'ng-flash-messages';
import {AppraisalSheetService} from './service/appraisal-sheet.service';
import {UserService} from './service/user.service';
import {UserGroupService} from './service/user-group.service';
import {MatTableModule} from '@angular/material';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {AppraisalPageInfoComponent} from './document-page-info/appraisal-page-info.component';
import {AuthGuard} from './service/auth.guard';
import {AuthService} from './service/authentication.service';
import {ShowUsersComponent} from './show-users/show-users.component';
import {SortDirective} from './directives/SortDirective';

@NgModule({
  declarations: [
    AppComponent,
    AppraisalPageComponent,
    HeaderComponent,
    AdminPageComponent,
    NewSheetPageComponent,
    ArchivePageComponent,
    UserComponent,
    UserGroupComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    AppraisalPageInfoComponent,
    ShowUsersComponent,
    SortDirective
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgFlashMessagesModule.forRoot(),
    Ng2SearchPipeModule
  ],
  providers: [LoginService, NgFlashMessageService, UserService, UserGroupService, AppraisalSheetService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
