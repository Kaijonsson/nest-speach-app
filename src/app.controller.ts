import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudioFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() request: Request,
  ): Promise<unknown> {
    try {
      console.log('headers->', request.body);
      console.log('--->', file);
      // const transcription = await this.voiceService.transcribe(file);
      return { result: file };
      // return transcription;
    } catch (err) {
      console.error('error in transcription controller: ', err);
    }
  }
}
