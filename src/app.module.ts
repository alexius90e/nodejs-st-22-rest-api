import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UserGroup } from './shared/models/user-group.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRESDB_HOST,
      port: Number(process.env.POSTGRESDB_PORT),
      username: process.env.POSTGRESDB_USER,
      password: process.env.POSTGRESDB_PASSWORD,
      database: process.env.POSTGRESDB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      define: {
        timestamps: false,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    SequelizeModule.forFeature([UserGroup]),
    UsersModule,
    GroupsModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
