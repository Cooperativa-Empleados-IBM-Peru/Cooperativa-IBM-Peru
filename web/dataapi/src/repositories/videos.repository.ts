import {DefaultCrudRepository} from '@loopback/repository';
import {Videos, VideosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VideosRepository extends DefaultCrudRepository<
  Videos,
  typeof Videos.prototype.codgenero,
  VideosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Videos, dataSource);
  }
}
