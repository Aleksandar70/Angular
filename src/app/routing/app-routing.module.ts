import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import {DocumentInfoComponent} from '../document-info/document-info.component';
import {ProjectEvaluationComponent} from '../project-evaluation/project-evaluation.component';
import {AdminComponent} from '../admin/admin.component';
import {ArchiveComponent} from '../archive/archive.component';
import {UserComponent} from '../user-page/user.component';
import {UserGroupComponent} from '../user-page/user-group-page/user-group.component';
import {ShowUsersComponent} from '../show-users/show-users.component';
import {AuthGuard} from '../auth/auth.guard';
import {AdminGuard} from '../auth/auth.admin.guard';
import {EmployeeGuard} from '../auth/auth.employee.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'document-info', component: DocumentInfoComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'project-evaluation', component: ProjectEvaluationComponent, canActivate: [AuthGuard, EmployeeGuard]},
  {path: 'archive', component: ArchiveComponent, canActivate: [AuthGuard]},
  {path: 'new-user', component: UserComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'user-group', component: UserGroupComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'logout', component: UserGroupComponent, canActivate: [AuthGuard]},
  {path: 'all-users', component: ShowUsersComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: '**', redirectTo: '', canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

