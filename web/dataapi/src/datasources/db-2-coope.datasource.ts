import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {db2config} from './env';


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Db2CoopeDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db2coope';
  static readonly defaultConfig = db2config;

  constructor(
    @inject('datasources.config.db2coope', {optional: true})
    dsConfig: object = db2config,
  ) {
    super(dsConfig);
  }
}
