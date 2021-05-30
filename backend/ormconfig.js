// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ConfigUtils } = require('./src/config/config.utils');

// TypeORM CLI expects a promise to be returned directly from the config file.
module.exports = (async () => {
  const appConfig = await ConfigUtils.getAppConfig();
  return {
    type: 'postgres',
    ...appConfig.db,
    entities: ['src/**/*.entity.ts'],
    migrations: ['migrations/[1234567890]*.ts'],
    seeds: ['seeds/[1234567890]*.ts'],
    synchronize: false,
    cli: {
      migrationsDir: 'migrations',
      seedsDir: 'seeds',
    },
  };
})();