import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppraisalPageComponent} from './appraisal-page/appraisal-page.component';
import {NewSheetPageComponent} from './new-sheet-page/new-sheet-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {ArchivePageComponent} from './archive-page/archive-page.component';
import {UserComponent} from './user-page/user.component';
import {UserGroupComponent} from './user-page/user-group-page/user-group.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'appraisal-sheet', component: AppraisalPageComponent},
  {path: 'admin-page', component: AdminPageComponent},
  {path: 'new-sheet-page', component: NewSheetPageComponent},
  {path: 'archive-page', component: ArchivePageComponent},
  {path: 'add-new-user', component: UserComponent},
  {path: 'add-get-user-group', component: UserGroupComponent},
  {path: '**', redirectTo: ''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

