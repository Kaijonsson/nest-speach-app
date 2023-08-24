import { Body, Controller, Post } from '@nestjs/common';
import { VoiceService } from './voice.service';

@Controller('voice')
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post('interact')
  async interactWithChat(
    @Body() body: { recognizedText: string },
  ): Promise<any> {
    try {
      const response = await this.voiceService.interactWithChat(
        body.recognizedText,
      );
      return { status: 'ok', response };
    } catch (error) {
      console.error('Error during interaction:', error);
      return { error: 'Interaction failed' };
    }
  }
}
