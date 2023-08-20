import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class VoiceService {
  public async transcribe(audioFile: Express.Multer.File): Promise<unknown> {
    try {
      const API_KEY = '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';
      const configuration = new Configuration({
        organization: 'org-nd14id8uROZWx6TkgWUuiGED',
        apiKey: API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.listEngines();
      // const audioBuffer = await this.readFileAsBuffer(audioFile);
      // const audioStream = this.createReadableStream(audioFile);
      console.log('audiofile: ', audioFile);
      const audioStream = createReadStream(audioFile.path);
      const resp = await openai.createTranscription(
        //FIXME: bad any
        audioStream as any,
        'whisper-1',
      );
      console.log(JSON.stringify('data', resp.request.data));
      return resp;
    } catch (err) {
      //error object on whisper endpoint.
      console.error(err?.response?.data);
      throw err;
    }
  }

  // private async readFileAsBuffer(file: Blob): Promise<Buffer> {
  //   const arrayBuffer = await file.arrayBuffer();
  //   return Buffer.from(arrayBuffer);
  // }

  // private createReadableStream(buffer: Buffer): Readable {
  //   const readableStream = new Readable();
  //   readableStream.push(buffer);
  //   // readableStream.push(null);
  //   return readableStream;
  // }
}
