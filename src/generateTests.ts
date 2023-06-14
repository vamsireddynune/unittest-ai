import vscode = require("vscode");
import { CommandFactory } from "./commands";
import { UnitTestProvider } from "./providers/unitTestProvider";
import { writeFileSync } from "fs";
import { checkAndPromptForAPIKey } from "./configuration";

const supportedFileExtensions: Record<string, string> = {
  ts: "typescript",
  tsx: "react component in tsx",
  jsx: "react component in jsx",
  js: "javascript",
};

/**
 * If current active editor has a un-supported file, returns the editor.
 */
const checkActiveEditor = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage(
      "Cannot generate unit tests. No editor selected."
    );
    return;
  }
  const fileName = editor.document.fileName;
  const extension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
  if (!Object.keys(supportedFileExtensions).some((i) => i === extension)) {
    vscode.window.showInformationMessage(
      "Cannot generate unit tests. File in the editor is not a supported."
    );
    return;
  }
  if (editor.document.isDirty) {
    vscode.window.showInformationMessage(
      "File has unsaved changes. Save and try again."
    );
    return;
  }
  return editor;
};

export const generateTestCurrentFunction: CommandFactory =
  (ctx) => async () => {
    await generateTests(false);
  };

export const generateTestCurrentFile: CommandFactory = (ctx) => async () => {
  await generateTests(true);
};

const generateTests = async (completeFile: boolean) => {
  const editor = checkActiveEditor();
  if (!editor) {
    return false;
  }
  const apiKey = await checkAndPromptForAPIKey();
  if (!apiKey) {
    return false;
  }
  vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Window,
      cancellable: false,
      title: "Generating unit tests...",
    },
    async (progress) => {
      progress.report({ increment: 0 });

      await Promise.resolve();

      const selection = getSelectedFunction(editor, completeFile);
      const fileURL = editor.document.fileName;
      const fileExtensionIndex = fileURL.lastIndexOf(".");
      const fileNames = fileURL.slice(0, fileExtensionIndex).split("/");
      const fileExtension = fileURL
        .slice(fileExtensionIndex + 1)
        .toLocaleLowerCase();
      const fileName = fileNames.pop();
      const unittestProvider = new UnitTestProvider(apiKey);
      const unittests = await unittestProvider.getUnitTests(
        selection,
        `${fileName}.${fileExtension}` as string,
        supportedFileExtensions[fileExtension] as string
      );

      const filePath =
        fileNames.join("/") + `/${fileName}.spec.${fileExtension}`;
      const newFile = vscode.Uri.file(filePath);

      writeFileSync(filePath, unittests, "utf-8");
      await vscode.commands.executeCommand("vscode.open", newFile);
      await vscode.commands.executeCommand(
        "vscode.executeFormatDocumentProvider",
        newFile
      );
      progress.report({ increment: 100 });
      vscode.window.showInformationMessage(
        "Unit tests are generated successfully."
      );
    }
  );
};

const getSelectedFunction = (
  editor: vscode.TextEditor,
  completeFile: boolean
) => {
  if (completeFile) {
    return editor.document.getText();
  }
  const selection = editor.selection;
  return editor.document.getText(selection);
};
