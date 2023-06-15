import { AIProviders, IAIClient } from ".";
import { AnthropicClient } from "./anthropicAIClient";
import { OpenAIClient } from "./openAIClient";

export class UnitTestProvider {
  aiClient: IAIClient;
  constructor(apiKey: string, aiProvider: AIProviders) {
    switch (aiProvider) {
      case AIProviders.OpenAI:
        this.aiClient = new OpenAIClient(apiKey);
        break;
      case AIProviders.ANTHROPIC:
        this.aiClient = new AnthropicClient(apiKey);
        break;
      default:
        this.aiClient = new OpenAIClient(apiKey);
        break;
    }
  }
  async getUnitTests(
    code: string,
    fileName: string,
    language: string,
    onlyFunction: boolean
  ) {
    return this.aiClient.getUnitTests(code, fileName, language, onlyFunction);
  }
}
