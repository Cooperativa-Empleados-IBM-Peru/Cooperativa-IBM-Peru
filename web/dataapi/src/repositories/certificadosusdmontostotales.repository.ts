import {DefaultCrudRepository} from '@loopback/repository';
import {Certificadosusdmontostotales, CertificadosusdmontostotalesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CertificadosusdmontostotalesRepository extends DefaultCrudRepository<
  Certificadosusdmontostotales,
  typeof Certificadosusdmontostotales.prototype.id,
  CertificadosusdmontostotalesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Certificadosusdmontostotales, dataSource);
  }
}
