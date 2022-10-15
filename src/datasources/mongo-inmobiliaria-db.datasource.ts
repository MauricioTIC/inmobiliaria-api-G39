import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongo_inmobiliaria_db',
  connector: 'mongodb',
  url: 'mongodb+srv://root:Admin123.@clustermintic2022inmobi.22t3uiv.mongodb.net/InmobiliariaDB?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoInmobiliariaDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongo_inmobiliaria_db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongo_inmobiliaria_db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
