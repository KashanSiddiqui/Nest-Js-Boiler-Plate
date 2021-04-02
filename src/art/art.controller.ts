import { Controller, Get, Post, Body, Req, Res, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ArtService } from './art.service';
import { Request, Response } from 'express';
import { diskStorage } from 'multer'
import { FilesInterceptor } from '@nestjs/platform-express'
import { editFileName, imageFileFilter } from '../utils/verifyUploadFileFormat'

@Controller('arts')
export class ArtController {
    constructor(private readonly artService: ArtService) { }

    @Get('/')
    async getArt(@Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.artService.getArt(req);
            res.status(200).send(
                {
                    responseCode: 200,
                    responseMessage: "Success",
                    result: result
                }
            )
        }
        catch (error) {
            console.log("view errors", error)
            res.status(400).send(
                {
                    responseCode: 400,
                    responseMessage: error,
                    result: error
                }
            )
        }
    }

    @Post('/add')
    @UseInterceptors(
        FilesInterceptor('file', 5, {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    
    async addArt(@UploadedFiles() files, @Req() req: Request, @Res() res: Response) {
        try {
            const response = [];
            files.forEach(file => {
                let filename = file.filename
                response.push(filename);
            });
            req.body.img = response
            console.log("io i", response)
            const result = await this.artService.addArt(req);
            res.status(201).send(
                {
                    responseCode: 201,
                    responseMessage: "Created",
                    result: result
                }
            )
        } catch (error) {
            console.log("view error ", error)
            res.status(400).send(
                {
                    responseCode: 400,
                    responseMessage: error,
                    result: error
                }
            )
        }
    }


    @Post('/')
    async filter(@Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.artService.filter(req);
            res.status(201).send(
                {
                    responseCode: 201,
                    responseMessage: "Success",
                    result: result
                }
            )
        }
        catch (error) {
            res.status(400).send(
                {
                    responseCode: 400,
                    responseMessage: error,
                    result: error
                }
            )
        }
    }

}