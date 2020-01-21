import { Controller, Post, Body, Param} from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @Post()
  async sendMail() {
    //   console.log(producTitle,productDescription,productPrice,"Firsttt")
    try{
        const res= await this.nodemailerService.mailToCustomMail();
        return {result:res}

    }
    catch(error){
        return error
    }
}

    
}
