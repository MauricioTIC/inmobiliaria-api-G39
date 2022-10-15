import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoInmobiliariaDbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.mongo_inmobiliaria_db') dataSource: MongoInmobiliariaDbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Propietario, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
