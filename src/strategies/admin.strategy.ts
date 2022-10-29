import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, RedirectRoute, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services/autenticacion.service';

export class EstrategiaAdministrador implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    public autenticacionService: AutenticacionService
  ) { }

  async authenticate(request: Request): Promise<UserProfile | RedirectRoute | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.autenticacionService.validarTokenJWT(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({
          nombre: "datos.nombre"
        });
        return perfil;
      } else {
        throw new HttpErrors[401]('Token invalido');
      }
    } else {
      throw new HttpErrors[403]('No se ha detectado información del token');
    }
  }
}
