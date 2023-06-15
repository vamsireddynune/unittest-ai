# unittest-ai

An assistant to generate unit tests using generative AI.

## Steps to install and run the extension.

- Download extension file(unittest-ai-x.x.x.vsix) available in the project root.
- Open visual studio code and go to extensions tab.
- Click on three dots(`...`) in the top right corner, click on `Install from VSIX...` option and choose downloaded extension. With this you have extension installed in Vscode.
- To run the tests you need use the following commands(press `cmd + shift + p`)
  - `unittest-ai.test.generate.function` to generate tests for selected function.
  - `unittest-ai.test.generate.file` to generate tests for selected file.
- When you run these commands for the first time, extension would prompt to enter the OpenAI API key.
- `Open AI` is set as default LLM provider. Incase if you want to switch to `Anthropic`, you should changes it in the `provider` option in the extension settings(UnitTest AI).

## Steps run extension code

- In the app root, run `yarn install` to install all the package depenedencies.
- Use `RUN AND DEBUG` pane in the left menu option and click on `Run Extension` button to run the extension. And this would open a new vscode window with extension integrated.

## How to contribute

- `activate` method in `extension.ts` in the src folder is the method that gets executed on the extension launch, so add all the necessary registration logic in the `activate` method.
