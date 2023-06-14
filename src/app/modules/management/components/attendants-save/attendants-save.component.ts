import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from 'src/app/core/services/messages.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesResponse, ResponseApi, ValidationsModal } from 'src/app/core/resources/resources.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeasonsService } from '../../services/seasons.service';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';
import { AttendantsService } from '../../services/attendants.service';
import { RutValidator } from 'src/app/shared/directives/rut.validation';


@Component({
  selector: 'app-attendants-save',
  templateUrl: './attendants-save.component.html',
  styleUrls: ['./attendants-save.component.scss']
})
export class AttendantsSaveComponent implements OnInit {
  attendantForm: FormGroup;
  save = ValidationsModal.Save;
  update = ValidationsModal.Update;
  estaciones: any = [];
  infouser: any;
  constructor(
    public dialog: MatDialog,
    readonly seasonsService: SeasonsService,
    readonly messagesService: MessagesService,
    readonly formBuilder: FormBuilder,
    readonly authMsalService: AuthMsalService,
    readonly attendantsService: AttendantsService,
    readonly dialogRef: MatDialogRef<AttendantsSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { validation: string, atendedor: any }
  ) {
    dialogRef.disableClose = true;
    this.infouser = this.authMsalService.retunData()?.sub;
  }

  ngOnInit(): void {
    this.getSeasons();
    this.initForm();
    this.setValueData();
  }

  initForm(): void {
    this.attendantForm = this.formBuilder.group({
      rut: ['', [Validators.required, RutValidator()]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      ideess: ['', Validators.required],
      id: ['']
    });
  }


  /**
   *
   *
   * @param {string} controlName
   * @param {string} errorName
   * @memberof AttendantsSaveComponent
   */
  hasRutError = (controlName: string, errorName: string) => {
    return this.attendantForm.controls[controlName]?.hasError(errorName);
  }

  /**
   * this function consults the service stations
   *
   * @memberof AttendantsSaveComponent
  */
  setValueData(): void {
    if (this.data.validation === this.update) {
      this.attendantForm.setValue({
        rut: this.data?.atendedor?.rut,
        name: this.data?.atendedor?.nombre,
        lastname: this.data?.atendedor?.apellido,
        ideess: this.data?.atendedor?.ideess,
        id: this.data?.atendedor?.id,
      });
      this.disableForm();
    }
  }


  /**
   *
   *
   * @memberof AttendantsSaveComponent
   */
  disableForm(): void {
    this.attendantForm.controls['rut'].disable();
    this.attendantForm.controls['id'].disable();
  }

  /**
   * this function consults the service stations
   *
   * @memberof AttendantsSaveComponent
   */
  getSeasons(): any {
    this.seasonsService.getSeasons(this.infouser).subscribe(res => {
      this.estaciones = res?.data;
    });
  }

  /**
   *
   *
   * @memberof ModalFooterComponent
   */
  openConfirmAction(): void {
    this.messagesService.openConfirmAction('¿Estás seguro que deseas salir sin guardar los cambios?', 'warning').then((result: any) => {
      if (result.isConfirmed) {
        this.closeModal()
      }
    })
  }


  /**
   *
   *
   * @memberof AttendantsSaveComponent
   */
  closeModal() {
    this.dialog.closeAll();
  }



  /**
   * This function consumes the SAVE attendant service, then validates if the RUT is valid or not and depending on that it returns a message
   * @memberof AttendantsSaveComponent
   */
  saveAttendant() {
    const data = this.createEntity();
    this.attendantsService.saveAttendantsCount(data).subscribe(res => {
      if (res) {
        this.messagesService.openMessage(`${MessagesResponse.saveAttendant}
        ${data.nombre} ${data.apellido}${MessagesResponse.save}`, 'success');
        this.closeModal()
      } else {
        this.messagesService.openMessage(`${MessagesResponse.error}`, 'error');
      }
    }, error => { this.messagesService.openMessage(`${MessagesResponse.error} RUT ya existente.`, 'error'); });
  }



  /**
   * This function consumes the UPDATE attendant service, then validates if the RUT is valid or not and depending on that, it returns a message
   * @memberof AttendantsSaveComponent
   */
  updateAttendant() {
    const data = this.createEntity();
    this.attendantsService.updateAttendantsCount(data, this.data.atendedor.rut).subscribe(res => {
      if (res?.data) {
        // oprecacion exitosa
        this.messagesService.openMessage(`${MessagesResponse.updateAttendant}
        ${data.nombre} ${data.apellido}${MessagesResponse.update}`, 'success');
        this.closeModal();
      } else {
        //  rut invalido
        this.messagesService.openMessage(`${MessagesResponse.error}`, 'error');
        this.closeModal();
      }
    }, error => { this.messagesService.openMessage(`${MessagesResponse.error}`, 'error'); });
  }


  /**
   * This function returns an ATTENDER entity, depending on whether it is to save or update
   * @memberof AttendantsSaveComponent
   */
  createEntity(): any {
    let data = {};
    if (this.data.validation === this.save) {
      data = {
        rut: this.attendantForm.value.rut,
        idrol: 1,
        nombre: this.attendantForm.value.name,
        apellido: this.attendantForm.value.lastname,
        ideess: this.attendantForm.value.ideess,
        lastsessiondat: null,
        desactivationdat: null
      }
      return data;
    } else {
      data = {
        nombre: this.attendantForm.value.name,
        apellido: this.attendantForm.value.lastname,
        ideess: this.attendantForm.value.ideess,
      }
      return data;
    }
  }
}
