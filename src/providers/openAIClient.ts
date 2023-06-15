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

  async getUnitTests(
    code: string,
    fileName: string,
    language: string,
    onlyFunction: boolean
  ) {
    const prompt = `
      Write unit tests using jest for business logic in the following ${language} ${
      onlyFunction ? "function" : ""
    } code from the file ${fileName}, use async await if necessary and add mocks if necessary, cover all possible test cases, and just respond with unit test file with code?
      ${code}
    `;
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
