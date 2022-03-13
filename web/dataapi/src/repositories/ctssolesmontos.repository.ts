import {DefaultCrudRepository} from '@loopback/repository';
import {Ctssolesmontos, CtssolesmontosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CtssolesmontosRepository extends DefaultCrudRepository<
  Ctssolesmontos,
  typeof Ctssolesmontos.prototype.id,
  CtssolesmontosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Ctssolesmontos, dataSource);
  }
}
