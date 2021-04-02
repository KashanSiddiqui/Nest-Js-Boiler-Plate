import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSchema } from './auth.model';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { keyConstant } from './constants/key-contants';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
  JwtModule.register({
    secret: keyConstant.secret,
    signOptions: { expiresIn: '180s' },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
