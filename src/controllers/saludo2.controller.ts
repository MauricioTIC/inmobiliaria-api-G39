// Uncomment these imports to begin using these cool features!

import { get } from "@loopback/rest";

// import {inject} from '@loopback/core';


export class Saludo2Controller {
  constructor() {}

  @get('/Saludar2')
  saludar2(): string{
    return ('Hola desde Loopback');
  }
}
