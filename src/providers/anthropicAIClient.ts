import { AI_PROMPT, Client, HUMAN_PROMPT } from "@anthropic-ai/sdk";
import { IAIClient } from ".";

export class AnthropicClient implements IAIClient {
  client: Client;
  constructor(apiKey: string) {
    this.client = new Client(apiKey);
  }

  async getUnitTests(
    code: string,
    fileName: string,
    language: string,
    onlyFunction: boolean
  ) {
    const prompt = `
    ${HUMAN_PROMPT} Create complete unit tests suite using jest framework and necessary dependencies for only the following ${language} ${
      onlyFunction ? "function" : ""
    } code from the file ${fileName} and use it as dependency.
    Simply return unit test complete suite code in ${language}.
    In test cases, mock the 3rd party dependencies, and use async await for asynchronous code, 
    don't return any description, or comments, or examples.
    Here is the code you should create tests for: ${code}
  `;
    const completion = await this.client.complete({
      prompt,
      stop_sequences: [HUMAN_PROMPT],
      max_tokens_to_sample: 1000,
      model: "claude-v1",
    });
    console.log({
      completion,
    });
    return completion.completion.replace("Human: ", "");
  }
}
