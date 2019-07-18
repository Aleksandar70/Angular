import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './routing/app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {AdminComponent} from './admin/admin.component';
import {ProjectEvaluationComponent} from './project-evaluation/project-evaluation.component';
import {ArchiveComponent} from './archive/archive.component';
import {UserComponent} from './user-page/user.component';
import {UserGroupComponent} from './user-page/user-group-page/user-group.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './service/login.service';
import {NgFlashMessageService, NgFlashMessagesModule} from 'ng-flash-messages';
import {ProjectEvaluationService} from './service/project-evaluation.service';
import {UserService} from './service/user.service';
import {UserGroupService} from './service/user-group.service';
import {MatTableModule} from '@angular/material';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {DocumentInfoComponent} from './document-info/document-info.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {ShowUsersComponent} from './show-users/show-users.component';
import {SortDirective} from './directives/SortDirective';
import {AdminGuard} from './auth/auth.admin.guard';
import {EmployeeGuard} from './auth/auth.employee.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AdminComponent,
    ProjectEvaluationComponent,
    ArchiveComponent,
    UserComponent,
    UserGroupComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    DocumentInfoComponent,
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
    Ng2SearchPipeModule,
  ],
  providers: [LoginService, NgFlashMessageService, UserService,
    UserGroupService, ProjectEvaluationService, AuthService,
    AuthGuard, AdminGuard, EmployeeGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
