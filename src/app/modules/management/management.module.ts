import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/shared.modules';
import { ManagementComponent } from './management.component';
import { ManagementRoutingModule } from './management.routing';
import { SeasonsComponent } from './components/seasons/seasons.component';
import { AttendantsComponent } from './components/attendants/attendants.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule } from '@angular/forms';
import { AttendantsSaveComponent } from './components/attendants-save/attendants-save.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MomentPipe } from 'src/app/shared/pipes/MomentPipe';

const MODAL_COMPONENTS: any = [AttendantsSaveComponent];
const COMPONENTS_LIST: any = [ManagementComponent, SeasonsComponent, AttendantsComponent];

@NgModule({
    declarations: [
        COMPONENTS_LIST,
        MODAL_COMPONENTS,
        MomentPipe
    ],
    entryComponents: [
        MODAL_COMPONENTS
    ],
    imports: [ManagementRoutingModule, FormsModule, SharedComponentsModule, MatTableExporterModule, NgxPermissionsModule.forChild()],
    providers: [],
})
export class ManagementModule { }