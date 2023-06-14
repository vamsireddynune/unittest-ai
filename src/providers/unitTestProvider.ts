import { IAIClient } from ".";
import { OpenAIClient } from "./openAIClient";

export class UnitTestProvider {
  aiClient: IAIClient;
  constructor(apiKey: string) {
    // if (!this.aiClient) {
    this.aiClient = new OpenAIClient(apiKey);
    // }
  }
  async getUnitTests(code: string, fileName: string, language: string) {
    const promptForUnitTests = `
      Write unit tests using jest for business logic in the following ${language} code from the file ${fileName}, use async await if necessary and add mocks if necessary, cover all possible test cases, and just respond with unit test file with code?
      ${code}
    `;
    return this.aiClient.getUnitTests(promptForUnitTests);
  }
}
