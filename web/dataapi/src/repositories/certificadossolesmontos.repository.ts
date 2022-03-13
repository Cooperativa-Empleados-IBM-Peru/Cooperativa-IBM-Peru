import {DefaultCrudRepository} from '@loopback/repository';
import {Certificadossolesmontos, CertificadossolesmontosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CertificadossolesmontosRepository extends DefaultCrudRepository<
  Certificadossolesmontos,
  typeof Certificadossolesmontos.prototype.id,
  CertificadossolesmontosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Certificadossolesmontos, dataSource);
  }
}
