import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Propietario,
  Inmueble,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioInmuebleController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble[]> {
    return this.propietarioRepository.inmuebles(id).find(filter);
  }

  @post('/propietarios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.propietarioRepository.inmuebles(id).create(inmueble);
  }

  @patch('/propietarios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Propietario.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.propietarioRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/propietarios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Propietario.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.propietarioRepository.inmuebles(id).delete(where);
  }
}
