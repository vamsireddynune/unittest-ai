import * as vscode from "vscode";
import { ConfigurationTarget } from "vscode";

const providerAPIKey = "providerApiKey";

export const checkAndPromptForAPIKey = async () => {
  const extensionConfig = vscode.workspace.getConfiguration("unittest-ai");
  const apiKey = extensionConfig.get(providerAPIKey) as string;
  if (!apiKey) {
    const apiKeyInput = await vscode.window.showInputBox({
      placeHolder: "Enter provider API key to generate unit tests.",
    });
    if (apiKeyInput) {
      await extensionConfig.update(
        providerAPIKey,
        apiKeyInput,
        ConfigurationTarget.Global
      );
      return apiKeyInput;
    } else {
      vscode.window.showInformationMessage(
        "API key is required to generate unit tests."
      );
      return;
    }
  }
  return apiKey;
};
