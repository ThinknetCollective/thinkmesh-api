import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeshNodesModule } from './mesh-nodes/mesh-nodes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST') || 'localhost',
        port: parseInt(config.get('DB_PORT', '5432')),
        username: config.get('DB_USERNAME') || 'postgres',
        password: config.get('DB_PASSWORD') || 'password',
        database: config.get('DB_NAME') || 'meshnode_db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
        logging: true, // Optional: for debugging
      }),
    }),
    MeshNodesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}