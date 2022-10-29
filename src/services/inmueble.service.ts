import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Inmueble} from '../models/inmueble.model';
import {InmuebleRepository} from '../repositories/inmueble.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class InmuebleService {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository
  ) { }

  getInmueblesDisponibles(): Promise<Inmueble[]> {
    let inmuebles = this.inmuebleRepository.find({
      where: {
        estado: 'A'
      }
    });
    return inmuebles;
  }
}
