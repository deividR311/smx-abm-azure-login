import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';



@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor() { }

    /**
     * Esta funcion se utiliza para utilizar un mensaje de confirmación 
     * luego de que confirme si esta bien o no devolver una promesa
     *
     * @memberof MessagesService
     */
    openConfirmAction(message?: string, icon?: any, text?: string): any {
        return Swal.fire({
            title: message,
            icon: icon,
            text: text,
            showCancelButton: true,
            confirmButtonColor: '#008542',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        })
    }


    /**
     * esta funcion se utiliza para indicar un mensaje de que ya se realizo una accion
     *
     * @memberof MessagesService
     */
    openMessage(message?: string, icon?: any) {
        Swal.fire({
            position: 'center',
            icon: icon,
            title: message,
            showConfirmButton: false,
            timer: 6500,

        })
    }



    /**
     *
     *
     * @param {string} [message]
     * @param {*} [icon]
     * @memberof MessagesService
     */
    openMesaggeTop(message?: string, icon?: any) {
        Swal.fire({
            position: 'top-end',
            icon: icon,
            title: message,
            showConfirmButton: false,
            timer: 6500
        })
    }
}