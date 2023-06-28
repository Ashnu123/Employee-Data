import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './profile/dashboard/dashboard.component';
import { AuthGuard } from "./auth/auth.guard";
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeMenuComponent } from './employee-menu/employee-menu.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard], children:[
    { path: 'details', component: EmployeeDetailsComponent },
    { path: 'menu', component: EmployeeMenuComponent },
    { path: 'new', component: EmployeeFormComponent },
    { path: ':id/edit', component: EmployeeFormComponent }
  ]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
