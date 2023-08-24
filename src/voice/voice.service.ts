import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class VoiceService {
  public async interactWithChat(recognizedText: string): Promise<any> {
    try {
      const API_KEY = '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';
      console.log('text_-----> ', recognizedText);
      const openai = new OpenAI({
        organization: 'org-nd14id8uROZWx6TkgWUuiGED',
        apiKey: API_KEY,
      });

      const response = await openai.completions.create({
        model: 'text-davinci-003',
        prompt:
          'give me a recipy from these ingredients: eggs, bacon, potatoes, cream, pasta',
      });
      console.log('gpt response: ', response);

      return response;
    } catch (error) {
      console.error('Error from OpenAI:', error);
      throw error;
    }
  }
}
