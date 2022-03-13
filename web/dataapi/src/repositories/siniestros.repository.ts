import {DefaultCrudRepository} from '@loopback/repository';
import {Siniestros, SiniestrosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SiniestrosRepository extends DefaultCrudRepository<
  Siniestros,
  typeof Siniestros.prototype.codempleado,
  SiniestrosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Siniestros, dataSource);
  }
}
