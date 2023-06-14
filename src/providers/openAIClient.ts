import { Configuration, OpenAIApi } from "openai";
import { IAIClient } from ".";

export class OpenAIClient implements IAIClient {
  openai: OpenAIApi;
  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async getUnitTests(prompt: string) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
    });
    console.log({
      choices: completion.data.choices,
    });
    return completion.data.choices[0].text;
  }
}
