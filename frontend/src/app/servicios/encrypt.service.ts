import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  key = 'ticketex';

  constructor() { }

  public encrypt(psw: string): string {
    return CryptoJS.AES.encrypt(psw, this.key).toString();
  }

  public decrypt(psw: string) {
    return CryptoJS.AES.decrypt(psw, this.key).toString(CryptoJS.enc.Utf8);
  }
  
}
