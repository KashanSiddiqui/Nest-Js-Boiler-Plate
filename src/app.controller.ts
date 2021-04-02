import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { JWTAuthGuard } from "./auth/jwt/jwt-auth.guard";
import { diskStorage } from "multer";
import { Request, Response } from 'express';
import { FilesInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "./utils/verifyUploadFileFormat";

@Controller()
@UseGuards(new JWTAuthGuard())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/add")
  @UseInterceptors(
    FilesInterceptor("file", 5, {
      storage: diskStorage({
        destination: "./uploads",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async addArt(
    @UploadedFiles() files,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = [];
      files.forEach((file) => {
        let filename = file.filename;
        response.push(filename);
      });
     
      res.status(201).send({
        responseCode: 201,
        responseMessage: "Created",
        result: response,
      });
    } catch (error) {
      console.log("view error ", error);
      res.status(400).send({
        responseCode: 400,
        responseMessage: error,
        result: error,
      });
    }
  }
}
