import vscode = require('vscode');
import { CommandFactory } from './commands';

const supportedFileExtensions = ["ts", "tsx", "js"];

/**
 * If current active editor has a un-supported file, returns the editor.
 */
function checkActiveEditor(): vscode.TextEditor | undefined {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showInformationMessage('Cannot generate unit tests. No editor selected.');
		return;
	}
    const fileName = editor.document.fileName;
    const extension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
	if (!supportedFileExtensions.some( i => i === extension)) {
		vscode.window.showInformationMessage('Cannot generate unit tests. File in the editor is not a supported.');
		return;
	}
	if (editor.document.isDirty) {
		vscode.window.showInformationMessage('File has unsaved changes. Save and try again.');
		return;
	}
	return editor;
}


export const generateTestCurrentFunction: CommandFactory = (ctx) => () => {
	const editor = checkActiveEditor();
	if (!editor) {
		return false;
	}
};