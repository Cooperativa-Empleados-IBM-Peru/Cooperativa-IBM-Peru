import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Presp2, Presp2Relations} from '../models';

export class Presp2Repository extends DefaultCrudRepository<
  Presp2,
  typeof Presp2.prototype.id,
  Presp2Relations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Presp2, dataSource);
  }
}
