import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Presp1, Presp1Relations} from '../models';

export class Presp1Repository extends DefaultCrudRepository<
  Presp1,
  typeof Presp1.prototype.id,
  Presp1Relations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Presp1, dataSource);
  }
}
