// Uncomment these imports to begin using these cool features!

import { get } from '@loopback/rest';


export class SaludoController {
  constructor() {}

  //router.get('/saludar')
  @get('/saludar')
  saludar():string {
    return ('Hola desde mi primer servicios REST - Loopback');
  }
}
