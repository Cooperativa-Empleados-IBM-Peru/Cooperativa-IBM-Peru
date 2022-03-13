import {DefaultCrudRepository} from '@loopback/repository';
import {Fra, FraRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FraRepository extends DefaultCrudRepository<
  Fra,
  typeof Fra.prototype.codempleado,
  FraRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Fra, dataSource);
  }
}
