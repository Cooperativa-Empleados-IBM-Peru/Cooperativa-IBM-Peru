import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {cloudantconfig} from './env';


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CloudantcoopeDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'cloudantcoope';
  static readonly defaultConfig = cloudantconfig;

  constructor(
    @inject('datasources.config.cloudantcoope', {optional: true})
    dsConfig: object = cloudantconfig,
  ) {
    super(dsConfig);
  }
}
