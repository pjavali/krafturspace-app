import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./pages/reset-password/reset-password.module').then(
        m => m.ResetPasswordPageModule
      )
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
{
    path: 'help',
    loadChildren: () =>
      import('src/app/pages/help/help.module').then(m => m.HelpPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'project-setup',
    loadChildren: () =>
      import('./project/project-setup/project-setup.module').then(m => m.ProjectSetupPageModule),
    canActivate: [AuthGuard]
  },

{
    path: 'inspection',
    loadChildren: () =>
      import('./project/inspection/inspection.module').then(m => m.InspectionPageModule),
    canActivate: [AuthGuard]
  },

{
    path: 'project-edit',
    loadChildren: () =>
      import('./project/project-edit/project-edit.module').then(m => m.ProjectEditPageModule),
    canActivate: [AuthGuard]
  },
 
 {
    path: 'reports',
    loadChildren: () =>
      import('./project/reports/reports.module').then(m => m.ReportsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'apartment-assignment',
    loadChildren: () =>
      import('./project/apartment-assignment/apartment-assignment.module').then(m => m.ApartmentAssignmentPageModule),
    canActivate: [AuthGuard]
  },
  
  

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
