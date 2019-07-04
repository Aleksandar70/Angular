import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppraisalPageComponent} from './home-page/appraisal-page.component';
import {AppraisalPageInfoComponent} from './document-page-info/appraisal-page-info.component';
import {NewSheetPageComponent} from './project-evaluation-page/new-sheet-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {ArchivePageComponent} from './archive-page/archive-page.component';
import {UserComponent} from './user-page/user.component';
import {UserGroupComponent} from './user-page/user-group-page/user-group.component';
import {ShowUsersComponent} from './show-users/show-users.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: AppraisalPageComponent},
  {path: 'document-info', component: AppraisalPageInfoComponent},
  {path: 'admin-page', component: AdminPageComponent},
  {path: 'project-evaluation', component: NewSheetPageComponent},
  {path: 'archive-page', component: ArchivePageComponent},
  {path: 'new-user', component: UserComponent},
  {path: 'user-group', component: UserGroupComponent},
  {path: 'logout', component: UserGroupComponent},
  {path: 'all-users', component: ShowUsersComponent},
  {path: '**', redirectTo: ''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

