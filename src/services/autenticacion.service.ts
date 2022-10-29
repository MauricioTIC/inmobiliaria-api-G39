import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import generador from 'password-generator';
import {llaves} from '../config/llaves';
import {Propietario} from '../models/propietario.model';
import {PropietarioRepository} from '../repositories/propietario.repository';
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository
  ) { }

  generarClave(): string {
    let clave = generador(8, false);
    return this.cifrarClave(clave);
  }

  cifrarClave(clave: string): string {
    clave = cryptoJS.MD5(clave).toString();
    return clave;
  }

  /**
   * Valida si en la coleccion de propietarios existe un documento con ese usurio(correo) y esa clave
   * */
  validarAcceso(usuario: string, contrasenia: string) {
    try {
      let propietario = this.propietarioRepository.findOne({
        where: {
          correo: usuario,
          clave: contrasenia
        }
      });
      if (propietario)
        return propietario;

      return false;
    } catch (error) {
      return false;
    }
  }

  // Crear una fucntion que genere el token
  generarTokenJWT(propietario: Propietario) {
    let token = jwt.sign({
      data: {
        id: propietario.id,
        correo: propietario.correo,
        nombre: `${propietario.nombres} ${propietario.apellidos}`
      }
    },
      llaves.claveJWT);

    return token;
  }

  // validar la veracidad del token
  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, llaves.claveJWT)
      return datos;
    } catch (error) {
      return false;
    }
  }

}
