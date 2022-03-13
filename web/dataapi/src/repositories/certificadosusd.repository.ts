import {DefaultCrudRepository} from '@loopback/repository';
import {Certificadosusd, CertificadosusdRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CertificadosusdRepository extends DefaultCrudRepository<
  Certificadosusd,
  typeof Certificadosusd.prototype.id,
  CertificadosusdRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Certificadosusd, dataSource);
  }
}
