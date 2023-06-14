import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';

const AppRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/management/management.module').then((m) => m.ManagementModule),
    canActivate: [MsalGuard],
    canActivateChild: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ManagementComponent'],
        redirectTo: '/forbidden'
      }
    }
  },
  {
    path: 'support',
    loadChildren: () => import('./modules/support/support.module').then((m) => m.SupportModule),
    canActivate: [MsalGuard],
    canActivateChild: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['SupportComponent'],
        redirectTo: '/forbidden'
      }
    }
  },
  {
    path: 'managementeds',
    loadChildren: () => import('./modules/managementeds/managementeds.module').then((m) => m.ManagementEdsModule),
    canActivate: [MsalGuard],
    canActivateChild: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ManagementEdsComponent'],
        redirectTo: '/forbidden'
      }
    }
  },
  {
    path: 'state',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
