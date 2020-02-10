import { Controller, Post, Body, Param} from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('sendMail')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  //request to send invoice mail
  @Post()
  async sendMail(
      @Body() obj:Object
  ) {
    try{
        const res= await this.nodemailerService.mailToCustomMail(obj);
        return {responseCode:res[0],result:res[1]}

    }
    catch(error){
        throw error
    }
}

    
}
