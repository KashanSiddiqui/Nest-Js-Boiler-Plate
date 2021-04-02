import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Auth } from './auth.model'
import * as speakeasy from "speakeasy";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
@Injectable()
export class AuthService {
    products: Auth[] = [];
    users: any = [];
    constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) { }

    async signin(email, pass) {
        try {
            // console.log(req.body)


            // const getUser = await read.getUserLogin(req)
            try {
                const userExist = await this.authModel.findOne({ email: email })
                if (!userExist) {
                    return "User Doesnot Exist"
                }
                if (!bcrypt.compareSync(pass, userExist.hash)) return "Wrong Password";
                // const newUser = new this.authModel({ email, pass });
                const token = jwt.sign({ email: userExist.email }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                const user = {
                    userExist,
                    token
                }
                return user
            }
            catch (error) {
                throw [404,error.message]
            }

        }
        catch (error) {
            console.log(error)
            throw [404,error.message]
        }
    }

    async signup(req){
        // console.log(req,"requesttttt")
        try{
            // console.log("signup 2")
            const uniqueMail  = await this.authModel.findOne({email:req.email})
            console.log(uniqueMail)
            if(!uniqueMail){
                // console.log("inside if")
                req.hash = bcrypt.hashSync(req.password, 8);
                // console.log(req,"reqqq4")
                delete req.password;
   
                // console.log(req,"req222")
                const newUser = new this.authModel(req);
                const user = await this.authModel.create(newUser)
                // const signupDetails = user
                return user
            }
            else {
                // console.log("inside else")
                return "User Already Exist"
            }
        }
        catch(error){
            console.log(error)
            throw [404,error.message]
    
        }
    }

    generateSecret = email => {
        try {
          const secret = speakeasy.generateSecret();
          const user = {
            base32secret: secret.base32,
            email
          };
          this.users.push(user);
          return secret.otpauth_url;
        } catch (e) {
          console.log(e);
          return "";
        }
      };

      verifyToken = async (email, token) => {
        try {
          const user = this.users.filter(item => item.email === email);
          console.log(user);
          if (user.length) {
            const verified = speakeasy.totp.verify({
              secret: user[0].base32secret,
              encoding: "base32",
              token: token
            });
            if (verified) {
              const uniqueMail = await this.authModel.findOne({ email });
    
              if (!uniqueMail) {
                const newUser = new this.authModel(email);
                const user = await this.authModel.create(newUser);
              }
            }
            return verified;
          }
          return "user not found";
        } catch (e) {
          console.log(e);
          return "";
        }
      };
  
}
