import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoiceController } from './voice/voice.controller';
import { VoiceService } from './voice/voice.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, VoiceController],
  providers: [AppService, VoiceService],
})
export class AppModule {}
