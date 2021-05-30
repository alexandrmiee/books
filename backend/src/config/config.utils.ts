import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppConfigModule } from './appConfig.module';
import { AppConfigService } from './appConfig.service';

export class ConfigUtils {
  static async getAppConfig(): Promise<AppConfigService> {
    @Module({
      imports: [AppConfigModule],
    })
    class DummyModule {}

    const app = await NestFactory.create(DummyModule, {
      logger: ['warn', 'error'],
    });

    const appConfigService = app.get(AppConfigService);
    return appConfigService;
  }
}
