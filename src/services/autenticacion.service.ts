import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import generador from 'password-generator';
const cryptoJS = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }

  generarClave(): string {
    let clave = generador(8, false);
    return this.cifrarClave(clave);
  }

  cifrarClave(clave: string): string {
    clave = cryptoJS.MD5(clave).toString();
    return clave;
  }
}
