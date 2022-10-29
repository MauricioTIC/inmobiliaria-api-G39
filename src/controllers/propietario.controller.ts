import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import fetch from 'cross-fetch';
import {Propietario} from '../models';
import {Credenciales} from '../models/credenciales.model';
import {PropietarioRepository} from '../repositories';
import {AutenticacionService} from '../services/autenticacion.service';

@authenticate("admin")
export class PropietarioController {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,

    @service(AutenticacionService)
    public autenticacionService: AutenticacionService,
  ) { }

  @post('/validar-acceso')
  @response(200, {
    description: 'Se validan las crendenciales de acceso al sistema'
  })
  async validarAcceso(
    @requestBody() credenciales: Credenciales
  ) {
    let propietario = await this.autenticacionService.validarAcceso(credenciales.usuario, credenciales.clave);
    if (propietario) {
      // generar el token con los datos de ese propietario
      let token = this.autenticacionService.generarTokenJWT(propietario);
      return {
        datos: {
          nombre: `${propietario.nombres} ${propietario.apellidos}`,
          correo: propietario.correo,
          id: propietario.id
        },
        token: token
      }
    } else {
      throw new HttpErrors[401]('No tiene permisos para realizar esta petición');
    }
  }

  @post('/propietarios')
  @response(200, {
    description: 'Propietario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Propietario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {
            title: 'NewPropietario',
            exclude: ['id'],
          }),
        },
      },
    })
    propietario: Omit<Propietario, 'id'>,
  ): Promise<Propietario> {
    // let clave = this.autenticacionService.generarClave();
    // propietario.clave = clave;
    propietario.clave = this.autenticacionService.cifrarClave(propietario.clave);
    let prop = await this.propietarioRepository.create(propietario);

    fetch('http://localhost:5000/enviar-correo?mensaje=Inscripción al sistema Inmobiliario&asunto=Inscrito al sistema InmoAPi&correo=' + prop.correo)
      .then((response) => console.log(`Propietario inscriuto en el sistema ${prop.correo}`));

    return prop;
  }

  @get('/propietarios/count')
  @response(200, {
    description: 'Propietario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Propietario) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.propietarioRepository.count(where);
  }

  @get('/propietarios')
  @response(200, {
    description: 'Array of Propietario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Propietario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Propietario) filter?: Filter<Propietario>,
  ): Promise<Propietario[]> {
    return this.propietarioRepository.find(filter);
  }

  @patch('/propietarios')
  @response(200, {
    description: 'Propietario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {partial: true}),
        },
      },
    })
    propietario: Propietario,
    @param.where(Propietario) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.propietarioRepository.updateAll(propietario, where);
  }

  @get('/propietarios/{id}')
  @response(200, {
    description: 'Propietario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Propietario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Propietario, {exclude: 'where'}) filter?: FilterExcludingWhere<Propietario>
  ): Promise<Propietario> {
    return this.propietarioRepository.findById(id, filter);
  }

  @patch('/propietarios/{id}')
  @response(204, {
    description: 'Propietario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {partial: true}),
        },
      },
    })
    propietario: Propietario,
  ): Promise<void> {
    await this.propietarioRepository.updateById(id, propietario);
  }

  @put('/propietarios/{id}')
  @response(204, {
    description: 'Propietario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() propietario: Propietario,
  ): Promise<void> {
    await this.propietarioRepository.replaceById(id, propietario);
  }

  @del('/propietarios/{id}')
  @response(204, {
    description: 'Propietario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.propietarioRepository.deleteById(id);
  }
}
