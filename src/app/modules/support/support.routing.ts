import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';

const SupportRoutes: Routes = [
    {
        path: '',
        component: SupportComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(SupportRoutes)],
    exports: [RouterModule],
})
export class SupportRoutingModule { }
