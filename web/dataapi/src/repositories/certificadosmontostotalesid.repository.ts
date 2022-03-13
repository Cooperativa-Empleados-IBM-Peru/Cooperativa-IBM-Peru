import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Certificadosmontostotalesid, CertificadosmontostotalesidRelations} from '../models';

export class CertificadosmontostotalesidRepository extends DefaultCrudRepository<
  Certificadosmontostotalesid,
  typeof Certificadosmontostotalesid.prototype.uuid,
  CertificadosmontostotalesidRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Certificadosmontostotalesid, dataSource);
  }
}
