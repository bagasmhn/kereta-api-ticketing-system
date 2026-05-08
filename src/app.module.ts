import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JenisKeretaModule } from './jenis-kereta/jenis-kereta.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env',
    }),

    UserModule,
    AuthModule,
    PrismaModule,
    JenisKeretaModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}