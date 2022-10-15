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
  Inmueble,
  Imagen,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleImagenController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/imagens', {
    responses: {
      '200': {
        description: 'Array of Inmueble has many Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Imagen)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Imagen>,
  ): Promise<Imagen[]> {
    return this.inmuebleRepository.imagenes(id).find(filter);
  }

  @post('/inmuebles/{id}/imagens', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Imagen)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {
            title: 'NewImagenInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) imagen: Omit<Imagen, 'id'>,
  ): Promise<Imagen> {
    return this.inmuebleRepository.imagenes(id).create(imagen);
  }

  @patch('/inmuebles/{id}/imagens', {
    responses: {
      '200': {
        description: 'Inmueble.Imagen PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {partial: true}),
        },
      },
    })
    imagen: Partial<Imagen>,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.inmuebleRepository.imagenes(id).patch(imagen, where);
  }

  @del('/inmuebles/{id}/imagens', {
    responses: {
      '200': {
        description: 'Inmueble.Imagen DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.inmuebleRepository.imagenes(id).delete(where);
  }
}
