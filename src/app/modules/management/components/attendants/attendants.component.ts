import { MatDialog } from '@angular/material/dialog';
import { MessagesResponse, ValidationsModal } from 'src/app/core/resources/resources.enum';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { AttendantsService } from '../../services/attendants.service';
import { AttendantsSaveComponent } from '../attendants-save/attendants-save.component';
import { MessagesService } from 'src/app/core/services/messages.service';
import { RutService } from 'rut-chileno' // <- importar aqui



@Component({
  selector: 'app-attendants',
  templateUrl: './attendants.component.html',
  styleUrls: ['./attendants.component.scss']
})
export class AttendantsComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['Identificador', 'RUT', 'Nombre', 'Apellido', 'EDS', 'FechaC', 'FechaU', 'Ultima', 'Gestion'];

  @Input() IdStation: any;
  @Input() station: any;
  @Input() iscreate: boolean = false;
  @Output() getList = new EventEmitter<any>();
  checked = false;
  attendants: any = [];
  text: string;
  constructor(
    readonly messagesService: MessagesService,
    readonly attendantsService: AttendantsService,
    readonly dialog: MatDialog,
    private rutService: RutService) { }
  @ViewChild(MatTableExporterDirective, { static: true }) exporter!: MatTableExporterDirective;
  @ViewChild('exportExcel') exportExcel: any;

  ngOnInit(): void { }

  ngOnChanges() {
    this.getAttendants();
    if (this.iscreate) {
      this.getAttendants();
    }
  }


  getAttendants(): any {
    this.checked = false;
    this.attendantsService.getAttendants(this.IdStation).subscribe(res => {
      this.ordenarArray(res.data);
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
    this.attendants = data;
  }


  openDialog(item: any) {
    const dialogRef = this.dialog.open(AttendantsSaveComponent, {
      width: '600px',
      disableClose: false,
      data: { validation: ValidationsModal.Update, atendedor: item }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.attendants = [];
      this.getAttendants();
      this.getList.emit();
    });
  }

  getRut(rut: string): any {
    if(rut != null){
      return  this.rutService.rutFormat(rut);
    } else {
      return rut;
    }
  }

  exporterExcel() {
    this.exportExcel._elementRef.nativeElement.click();
  }


  /**
  *
  *
  * @memberof ModalFooterComponent
  */
  openConfirmAction(item: any): void {
    let message: string = '';
    if (item.active == null) {
      message = 'Desactivar Usuario';
      this.text = '¿Está seguro que desea desactivar al usuario  ' + item.nombre + ' ' + item.apellido + ' de la estación de servicio?';
    } else {
      if (item.active == false) {
        message = 'Activar Usuario';
        this.text = '¿Está seguro que desea activar al usuario  ' + item.nombre + ' ' + item.apellido + ' de la estación de servicio?';
      } else {
        message = 'Desactivar Usuario';
        this.text = '¿Está seguro que desea desactivar al usuario  ' + item.nombre + ' ' + item.apellido + ' de la estación de servicio?';
      }
    }

    this.messagesService.openConfirmAction(message, 'warning', this.text).then((result: any) => {
      if (result.isConfirmed) {
        this.disabledAttendant(item);
      }
    })
  }

  disabledAttendant(item: any) {
    const data = this.createEntity(item.active);
    let message: string = '';
    if (data.active) {
      message = MessagesResponse.active;
    } else {
      message = MessagesResponse.disabled;
    }
    this.attendantsService.updateAttendantsCount(data, item.rut).subscribe(res => {
      this.messagesService.openMesaggeTop(`${MessagesResponse.updateAttendant}
        ${item.nombre} ${item.apellido}${message}`, 'success');
      this.attendants = [];
      this.getAttendants();
    }, error => { this.messagesService.openMesaggeTop(`${MessagesResponse.error}`, 'error'); });
  }

  createEntity(active: any): any {
    if (active == null) {
      const data = {
        active: false
      }
      return data;
    } else {
      if (active == false) {
        const data = {
          active: true
        }
        return data;
      } else {
        const data = {
          active: false
        }
        return data;
      }
    }
  }

}
