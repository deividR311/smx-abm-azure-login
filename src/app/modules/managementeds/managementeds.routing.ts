import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementEdsComponent } from './managementeds.component';

const ManagementEdsRoutes: Routes = [
    {
        path: '',
        component: ManagementEdsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(ManagementEdsRoutes)],
    exports: [RouterModule],
})
export class ManagementEdsRoutingModule { }
