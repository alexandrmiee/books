import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get app() {
    return {
      port: parseInt(this.configService.get('PORT'), 10) || 3000,
    };
  }

  get db(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.configService.get('POSTGRES_HOST'),
      port: Number(this.configService.get('POSTGRES_PORT')),
      username: this.configService.get('POSTGRES_USER'),
      password: this.configService.get('POSTGRES_PASSWORD'),
      database: this.configService.get('POSTGRES_DB'),
      ssl: this.configService.get('POSTGRES_SSL') === 'true',
      extra: {
        max: 30,
        connectionTimeoutMillis: 0,
        idleTimeoutMillis: 720000,
      },
    };
  }

  get typeOrm() {
    return {
      logging: this.configService.get('TYPEORM_LOGGING') === 'true',
    };
  }
}
