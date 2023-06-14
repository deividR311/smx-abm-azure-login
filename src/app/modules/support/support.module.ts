import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/shared.modules';
import { SupportComponent } from './support.component';
import { SupportRoutingModule } from './support.routing';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { StationListComponent } from './components/station-list/station-list.component';
import { UserAdminSaveComponent } from './components/user-admin-save/user-admin-save.component';
import { ListAdminUsersComponent } from './components/list-admin-users/list-admin-users.component';
import { MomentPipe2 } from 'src/app/shared/pipes/MomentPipe2';

@NgModule({
    declarations: [
        SupportComponent,
        StationListComponent,
        UserAdminSaveComponent,
        ListAdminUsersComponent,
        MomentPipe2
    ],
    entryComponents: [ UserAdminSaveComponent ],
    imports: [CommonModule, SupportRoutingModule, SharedComponentsModule, NgxPermissionsModule.forChild()],
    providers: [],
})
export class SupportModule { }