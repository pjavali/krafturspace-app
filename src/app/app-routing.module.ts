import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    loadChildren: () => import('src/app/pages/help/help.module').then(m => m.HelpPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'project-setup',
    loadChildren: () => import('./project/project-setup/project-setup.module').then(m => m.ProjectSetupPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'inspection',
    loadChildren: () => import('./project/inspection/inspection.module').then(m => m.InspectionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inspect-detail',
    loadChildren: () => import('./project/inspect-detail/inspect-detail.module').then(m => m.InspectDetailPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'project-edit',
    loadChildren: () => import('./project/project-edit/project-edit.module').then(m => m.ProjectEditPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'reports',
    loadChildren: () => import('./project/reports/reports.module').then(m => m.ReportsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'apartment-assignment',
    loadChildren: () => import('./project/apartment-assignment/apartment-assignment.module').then(m => m.ApartmentAssignmentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'assign-project',
    loadChildren: () => import('./project/assign-project/assign-project.module').then(m => m.AssignProjectPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-assign',
    loadChildren: () => import('./project/edit-assign/edit-assign.module').then(m => m.EditAssignPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'camera',
    loadChildren: () => import('./project/camera/camera.module').then(m => m.CameraPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'foyer',
    loadChildren: () => import('./projectAsset/foyer/foyer.module').then(m => m.FoyerPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'b2-dress',
    loadChildren: () => import('./projectAsset/b2-dress/b2-dress.module').then(m => m.B2DressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'b2-balcony',
    loadChildren: () => import('./projectAsset/b2-balcony/b2-balcony.module').then(m => m.B2BalconyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bedroom2',
    loadChildren: () => import('./projectAsset/bedroom2/bedroom2.module').then(m => m.Bedroom2PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'b1-toilet',
    loadChildren: () => import('./projectAsset/b1-toilet/b1-toilet.module').then(m => m.B1ToiletPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'b1-dress',
    loadChildren: () => import('./projectAsset/b1-dress/b1-dress.module').then(m => m.B1DressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'b1-balcony',
    loadChildren: () => import('./projectAsset/b1-balcony/b1-balcony.module').then(m => m.B1BalconyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bedroom1',
    loadChildren: () => import('./projectAsset/bedroom1/bedroom1.module').then(m => m.Bedroom1PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mtoilet',
    loadChildren: () => import('./projectAsset/mtoilet/mtoilet.module').then(m => m.MToiletPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mdress',
    loadChildren: () => import('./projectAsset/mdress/mdress.module').then(m => m.MDressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mbalcony',
    loadChildren: () => import('./projectAsset/mbalcony/mbalcony.module').then(m => m.MBalconyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'masterbedroom',
    loadChildren: () => import('./projectAsset/masterbedroom/masterbedroom.module').then(m => m.MasterbedroomPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'stoilet',
    loadChildren: () => import('./projectAsset/stoilet/stoilet.module').then(m => m.SToiletPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'servantroom',
    loadChildren: () => import('./projectAsset/servantroom/servantroom.module').then(m => m.ServantroomPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'kstore',
    loadChildren: () => import('./projectAsset/kstore/kstore.module').then(m => m.KStorePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'kutility',
    loadChildren: () => import('./projectAsset/kutility/kutility.module').then(m => m.KUtilityPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'kitchen',
    loadChildren: () => import('./projectAsset/kitchen/kitchen.module').then(m => m.KitchenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dbalcony',
    loadChildren: () => import('./projectAsset/dbalcony/dbalcony.module').then(m => m.DBalconyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dining',
    loadChildren: () => import('./projectAsset/dining/dining.module').then(m => m.DiningPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'l-balcony',
    loadChildren: () => import('./projectAsset/l-balcony/l-balcony.module').then(m => m.LBalconyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'livingroom',
    loadChildren: () => import('./projectAsset/livingroom/livingroom.module').then(m => m.LivingroomPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'c-toilet',
    loadChildren: () => import('./projectAsset/c-toilet/c-toilet.module').then(m => m.CToiletPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'b4-toilet',
    loadChildren: () => import('./projectAsset/b4-toilet/b4-toilet.module').then(m => m.B4ToiletPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'b4-dress',
    loadChildren: () => import('./projectAsset/b4-dress/b4-dress.module').then(m => m.B4DressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'b4-balcony',
    loadChildren: () => import('./projectAsset/b4-balcony/b4-balcony.module').then(m => m.B4BalconyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bedroom4',
    loadChildren: () => import('./projectAsset/bedroom4/bedroom4.module').then(m => m.Bedroom4PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'b3-toilet',
    loadChildren: () => import('./projectAsset/b3-toilet/b3-toilet.module').then(m => m.B3ToiletPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'b3-dress',
    loadChildren: () => import('./projectAsset/b3-dress/b3-dress.module').then(m => m.B3DressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'b3-balcony',
    loadChildren: () => import('./projectAsset/b3-balcony/b3-balcony.module').then(m => m.B3BalconyPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'b2-toilet',
    loadChildren: () => import('./projectAsset/b2-toilet/b2-toilet.module').then(m => m.B2ToiletPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'bedroom3',
    loadChildren: () => import('./projectAsset/bedroom3/bedroom3.module').then(m => m.Bedroom3PageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
