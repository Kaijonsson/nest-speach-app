import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VoiceService } from './voice.service';

@Controller('voice')
export class VoiceController {
  private readonly voiceService: VoiceService;
  constructor(voiceService: VoiceService) {
    this.voiceService = voiceService;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor(
      'file',
      //Specifies the destination folder for where to store the received file.
      { dest: './uploads' },
    ),
  )
  async uploadAudioFile(
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<unknown> {
    try {
      console.log('file--> ', file);
      const transcription = await this.voiceService.transcribe(file);
      return { status: 'ok' };
      // return transcription;
    } catch (err) {
      return { error: 'error' };
    }
  }
}
