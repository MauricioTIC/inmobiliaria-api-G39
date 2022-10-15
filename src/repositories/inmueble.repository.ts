import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoInmobiliariaDbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Propietario, Imagen} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {ImagenRepository} from './imagen.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Inmueble.prototype.id>;

  public readonly imagenes: HasManyRepositoryFactory<Imagen, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongo_inmobiliaria_db') dataSource: MongoInmobiliariaDbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>,
  ) {
    super(Inmueble, dataSource);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
