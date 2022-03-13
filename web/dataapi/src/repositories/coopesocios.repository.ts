import {DefaultCrudRepository} from '@loopback/repository';
import {Coopesocios, CoopesociosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CoopesociosRepository extends DefaultCrudRepository<
  Coopesocios,
  typeof Coopesocios.prototype.codempleado,
  CoopesociosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Coopesocios, dataSource);
  }
}
