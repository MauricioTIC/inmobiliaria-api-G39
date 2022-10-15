import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoInmobiliariaDbDataSource} from '../datasources';
import {Imagen, ImagenRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class ImagenRepository extends DefaultCrudRepository<
  Imagen,
  typeof Imagen.prototype.id,
  ImagenRelations
> {

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof Imagen.prototype.id>;

  constructor(
    @inject('datasources.mongo_inmobiliaria_db') dataSource: MongoInmobiliariaDbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Imagen, dataSource);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
