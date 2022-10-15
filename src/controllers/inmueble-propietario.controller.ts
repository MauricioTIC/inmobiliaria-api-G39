import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Propietario,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmueblePropietarioController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Propietario> {
    return this.inmuebleRepository.propietario(id);
  }
}
