import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/shared.modules';
import { ManagementEdsComponent } from './managementeds.component';
import { ManagementEdsRoutingModule } from './managementeds.routing';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { StationListEdsComponent } from './components/station-list-eds/station-list-eds.component';

@NgModule({
    declarations: [
        ManagementEdsComponent,
        StationListEdsComponent
    ],
    entryComponents: [],
    imports: [CommonModule, ManagementEdsRoutingModule, SharedComponentsModule, NgxPermissionsModule.forChild()],
    providers: [],
})
export class ManagementEdsModule { }
