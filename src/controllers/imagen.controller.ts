import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Imagen} from '../models';
import {ImagenRepository} from '../repositories';

export class ImagenController {
  constructor(
    @repository(ImagenRepository)
    public imagenRepository : ImagenRepository,
  ) {}

  @post('/imagenes')
  @response(200, {
    description: 'Imagen model instance',
    content: {'application/json': {schema: getModelSchemaRef(Imagen)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {
            title: 'NewImagen',
            exclude: ['id'],
          }),
        },
      },
    })
    imagen: Omit<Imagen, 'id'>,
  ): Promise<Imagen> {
    return this.imagenRepository.create(imagen);
  }

  @get('/imagenes/count')
  @response(200, {
    description: 'Imagen model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Imagen) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.imagenRepository.count(where);
  }

  @get('/imagenes')
  @response(200, {
    description: 'Array of Imagen model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Imagen, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Imagen) filter?: Filter<Imagen>,
  ): Promise<Imagen[]> {
    return this.imagenRepository.find(filter);
  }

  @patch('/imagenes')
  @response(200, {
    description: 'Imagen PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {partial: true}),
        },
      },
    })
    imagen: Imagen,
    @param.where(Imagen) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.imagenRepository.updateAll(imagen, where);
  }

  @get('/imagenes/{id}')
  @response(200, {
    description: 'Imagen model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Imagen, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Imagen, {exclude: 'where'}) filter?: FilterExcludingWhere<Imagen>
  ): Promise<Imagen> {
    return this.imagenRepository.findById(id, filter);
  }

  @patch('/imagenes/{id}')
  @response(204, {
    description: 'Imagen PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {partial: true}),
        },
      },
    })
    imagen: Imagen,
  ): Promise<void> {
    await this.imagenRepository.updateById(id, imagen);
  }

  @put('/imagenes/{id}')
  @response(204, {
    description: 'Imagen PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() imagen: Imagen,
  ): Promise<void> {
    await this.imagenRepository.replaceById(id, imagen);
  }

  @del('/imagenes/{id}')
  @response(204, {
    description: 'Imagen DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.imagenRepository.deleteById(id);
  }
}
