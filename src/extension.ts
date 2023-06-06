// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as commands from './commands';
import * as generateTests from './generateTests';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(ctx: vscode.ExtensionContext) {

	const registerCommand = commands.createRegisterCommand(ctx);

	registerCommand('unittest-ai.test.generate.function', generateTests.generateTestCurrentFunction);

}

// This method is called when your extension is deactivated
export function deactivate() {}
