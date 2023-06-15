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
      Write all possible unit tests using jest for business logic in the following ${language} ${
      onlyFunction ? "function" : ""
    } code from the file ${fileName}.
      In test cases, mock any third party dependencies when necessary, and use async await for asynchronous code,
      just respond with unit test file with code covering all possible test cases along with file depenedencies.
      Don't return any description, or comments, or examples.
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
