import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeasonsComponent } from './components/seasons/seasons.component';

const ManagementRoutes: Routes = [
    {
        path: '',
        component: SeasonsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(ManagementRoutes)],
    exports: [RouterModule],
})
export class ManagementRoutingModule { }
