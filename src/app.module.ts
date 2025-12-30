import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { MeshNodesModule } from './mesh-nodes/mesh-nodes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SolutionsModule } from './solutions/solutions.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),

    // ✅ Throttler configuration
    ThrottlerModule.forRoot({
      ttl: 60, // seconds
      limit: 10, // max requests per ttl per IP
    }),

    ScheduleModule.forRoot(),

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
        synchronize: true, // ❗ disable in production
        logging: true,
      }),
    }),

    MeshNodesModule,
    AuthModule,
    UsersModule,
    SolutionsModule,
    TagsModule,
  ],

  // ✅ Apply throttling globally
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
