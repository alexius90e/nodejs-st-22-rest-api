import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { GroupsModule } from './groups/groups.module';
import { UserGroup } from './shared/models/user-group.model';
import { UsersModule } from './users/users.module';

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
  ],
})
export class AppModule {}
