export interface IAIClient {
  getUnitTests: (prompt: string) => Promise<any>;
}
