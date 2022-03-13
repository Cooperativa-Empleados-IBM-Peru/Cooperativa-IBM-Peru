import {DefaultCrudRepository} from '@loopback/repository';
import {Certificadossoles, CertificadossolesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CertificadossolesRepository extends DefaultCrudRepository<
  Certificadossoles,
  typeof Certificadossoles.prototype.id,
  CertificadossolesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Certificadossoles, dataSource);
  }
}
