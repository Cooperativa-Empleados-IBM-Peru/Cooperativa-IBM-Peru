import {DefaultCrudRepository} from '@loopback/repository';
import {Movbloqueos, MovbloqueosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MovbloqueosRepository extends DefaultCrudRepository<
  Movbloqueos,
  typeof Movbloqueos.prototype.codempresa,
  MovbloqueosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Movbloqueos, dataSource);
  }
}
