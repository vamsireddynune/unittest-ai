export interface IAIClient {
  getUnitTests: (
    code: string,
    fileName: string,
    language: string,
    onlyFunction: boolean
  ) => Promise<any>;
}

export enum AIProviders {
  OpenAI = "OpenAI",
  ANTHROPIC = "Anthropic",
}
