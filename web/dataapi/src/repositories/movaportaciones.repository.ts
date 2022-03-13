import {DefaultCrudRepository} from '@loopback/repository';
import {Movaportaciones, MovaportacionesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MovaportacionesRepository extends DefaultCrudRepository<
  Movaportaciones,
  typeof Movaportaciones.prototype.codempresa,
  MovaportacionesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Movaportaciones, dataSource);
  }
}
