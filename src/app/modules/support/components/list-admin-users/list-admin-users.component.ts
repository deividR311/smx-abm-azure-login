import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { MessagesService } from 'src/app/core/services/messages.service';
import { UserAdminService } from '../../services/user-admin.services';

@Component({
  selector: 'app-list-admin-users',
  templateUrl: './list-admin-users.component.html',
  styleUrls: ['./list-admin-users.component.scss']
})
export class ListAdminUsersComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['Identificador', 'RUT', 'Nombre', 'Apellido', 'Email', 'EDS', 'FechaC', 'FechaU', 'Ultima', 'Gestion'];

  @Input() IdStation: any;
  @Input() station: any;
  @Input() iscreate: boolean = false;
  checked = false;
  listUsers: any = [];
  text: string;
  constructor(
    readonly messagesService: MessagesService,
    readonly userAdminService: UserAdminService,
    public dialog: MatDialog) { }
  @ViewChild(MatTableExporterDirective, { static: true }) exporter!: MatTableExporterDirective;
  @ViewChild('exportExcel') exportExcel: any;

  ngOnInit(): void { }

  ngOnChanges() {
    this.getAdminUsers();
    if (this.iscreate) {
      this.getAdminUsers();
    }
  }




  getAdminUsers(): any {
    this.checked = false;
    this.userAdminService.getAdminUsers().subscribe(res => {
      this.ordenarArray(res?.data);
    });
  }

  ordenarArray(data: any): any {
    //Filtrado de forma ascendente
    data.sort((a: any, b: any) => (a?.apellido > b?.apellido ? 1 : -1))
    data.sort((a: any, b: any) => {
      if (a.apellido?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") < b.apellido?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) {
        return -1;
      } else if (a.apellido?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") > b.apellido?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) {
        return 1;
      } else {
        return 0;
      }
    });
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      data[i].station = {};
      data[i].station.nombrefantasia = "";
      const abm_usuarios_eesses = element.abm_usuarios_eesses;
      for (let j = 0; j < abm_usuarios_eesses.length; j++) {
        const eesses = abm_usuarios_eesses[j].ee_ss;
        if (j > 0) {
          data[i].station.nombrefantasia = (data[i].station.nombrefantasia).toString().concat(', ').concat(eesses.nombrefantasia);
        }
        else {
          data[i].station.nombrefantasia = eesses.nombrefantasia;
        }
      }
    }
    this.listUsers = data;
  }

  openDialog(item: any) {
    alert("ok");
  }

  openConfirmAction(item: any) {
    let message: string = '';
    if (item.active == null) {
      message = 'Desactivar Usuario';
      this.text = 'Está seguro que desea desactivar al usuario  ' + item.nombre + ' ' + item.apellido || "";
    } else {
      if (item.active == false) {
        message = 'Activar Usuario';
        this.text = 'Está seguro que desea activar al usuario  ' + item.nombre + ' ' + item.apellido || "";
      } else {
        message = 'Desactivar Usuario';
        this.text = 'Está seguro que desea desactivar al usuario  ' + item.nombre + ' ' + item.apellido || "";
      }
    }

    this.messagesService.openConfirmAction(message, 'warning', this.text).then((result: any) => {
      if (result.isConfirmed) {
        alert("ok");
      }
    })
  }
}
