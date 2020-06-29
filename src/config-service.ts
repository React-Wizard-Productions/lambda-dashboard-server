import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Missing Configuration env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(key => this.getValue(key, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getSecret() {
    return this.getValue('JWT_SECRET', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASS'),
      database: this.getValue('DB_NAME'),

      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      migrationsTableName: 'migrations',

      migrations: [__dirname + '/migration/**/*{.ts,.js}'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
    };
  }
}

export const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
]);
