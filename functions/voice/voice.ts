import { NestFactory } from '@nestjs/core';
import express, { Request, Response } from 'express';
import { AppModule } from 'src/app.module';
import { VoiceService } from 'src/voice/voice.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const serverlessApp = express();
  const port = process.env.PORT || 3000;

  serverlessApp.use(express.json());

  serverlessApp.post(
    '/voice/recognize',
    async (req: Request, res: Response) => {
      try {
        const { recognizedText } = req.body;
        const voiceService = app.get(VoiceService);

        // Process the recognition result here, e.g., send it to OpenAI chat endpoint
        const openaiResponse = await voiceService.interactWithChat(
          recognizedText as string,
        );

        res
          .status(200)
          .json({ message: 'Recognition result received and processed' });
      } catch (err) {
        console.error('Error processing recognition result:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  );

  serverlessApp.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();
