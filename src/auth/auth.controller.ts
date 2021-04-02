import { Controller, Get, Post, Body, Param, Patch, Delete,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
  @Body('email') email:string,
  @Body('password') password:string ) {
    try{
      const res= await this.authService.signin(email,password);
    return {result:res}

  }
  catch(error){
      return error
  }
    
}

@Post('/signup')
  async signup(
  @Req() request:Request ) {
    try{
      // console.log("signup 1")
      const res= await this.authService.signup(request.body);
      return {result:res}
    }
    catch(error){
      return error
    }
}

@Post("/generateSecret")
  async generate(@Body("email") email: string) {
    try {
      const res = this.authService.generateSecret(email);
      if (res) {
        return { status: 200, data: res };
      }
      return { status: 400, data: [] };
    } catch (error) {
      return error;
    }
  }

  @Post("/verify")
  async verifyToken(@Body("email") email: string,@Body("token") token: string) {
    try {
      const res = await this.authService.verifyToken(email,token);
      if (typeof res == "boolean" ) {
        return { status: 200, data: res };
      }
      return { status: 400, data: [] };
    } catch (error) {
      return error;
    }
  }

}
