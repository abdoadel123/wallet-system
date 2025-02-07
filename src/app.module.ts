import { InternalServerErrorException, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresDatabaseConfig } from './common';
import { ConfigurationModule } from './config';
import { UserController } from './controllers';
import { Transaction, User } from './entities';
import { TransactionRepository, UserRepository } from './repositories';
import { UserService } from './services';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseConfig =
          configService.get<PostgresDatabaseConfig>('postgres');
        if (!databaseConfig)
          throw new InternalServerErrorException(
            'Cannot find database configuration',
          );

        return {
          type: 'postgres',
          debug: false,
          migrationsTableName: 'migrations',
          migrationsRun: true,
          synchronize: false,
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
          bigNumberStrings: false,
          logging: configService.get<boolean>('typeormLoggingEnabled'),
          cli: {
            migrationsDir: '/database/migrations',
          },
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.name,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Transaction]),
  ],
  controllers: [UserController],
  providers: [UserRepository, TransactionRepository, UserService],
})
export class AppModule {}
