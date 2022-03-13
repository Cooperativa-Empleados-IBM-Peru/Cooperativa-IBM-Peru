import {DefaultCrudRepository} from '@loopback/repository';
import {Movmiscelaneos, MovmiscelaneosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MovmiscelaneosRepository extends DefaultCrudRepository<
  Movmiscelaneos,
  typeof Movmiscelaneos.prototype.codempresa,
  MovmiscelaneosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Movmiscelaneos, dataSource);
  }
}
