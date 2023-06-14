import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { KeysLocalStorage } from '../resources/resources.enum';


@Injectable({
    providedIn: 'root'
})
export class EncryptService {

    constructor() { }

    /*
     * this function get token of session Storage
     */
    public setValueLocalStorage(value: any) {
        let ciphertext: any = [];
        ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), KeysLocalStorage.Login);
        localStorage.setItem(KeysLocalStorage.Login, ciphertext);
        return ciphertext;
    }

    /*
    * this function get token of Session Storage
    */

    public getValueLocalStorage() {
        const variable = localStorage.getItem(KeysLocalStorage.Login);
        if (variable === null) {
            return null;
        } else {
            const bytes = CryptoJS.AES.decrypt(variable.toString(), KeysLocalStorage.Login);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
    }

    /*
       * this function get token of session Storage
       */
    public setValueLocalStorageDiferentKey(value: any, key: string) {
        let ciphertext: any = [];
        ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), KeysLocalStorage.Login);
        localStorage.setItem(key, ciphertext);
        return ciphertext;
    }

    public getValueLocalStorageDiferentKey(key: string) {
        const variable = localStorage.getItem(key);
        if (variable === null) {
            return null;
        } else {
            const bytes = CryptoJS.AES.decrypt(variable.toString(), KeysLocalStorage.Login);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));;
        }
    }

    /*
 * this function get token of Session Storage
 */

    public getValueSessionStorage() {
        const variable = localStorage.getItem(KeysLocalStorage.session);
        if (variable === null) {
            return null;
        } else {
            const bytes = CryptoJS.AES.decrypt(variable.toString(), KeysLocalStorage.session);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        }
    }

    /*
       * this function get token of session Storage
       */
    public setValueSessionStorageDiferentKey(value: any, key: string) {
        let ciphertext: any = [];
        ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), KeysLocalStorage.session);
        localStorage.setItem(key, ciphertext);
        return ciphertext;
    }


    public getValueSessionStorageDiferentKey(key: string) {
        const variable = localStorage.getItem(key);
        if (variable === null) {
            return null;
        } else {
            const bytes = CryptoJS.AES.decrypt(variable.toString(), KeysLocalStorage.session);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        }
    }

}