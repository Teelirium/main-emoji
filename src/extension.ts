// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from "path";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "main-emoji" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
//   let disposable = vscode.commands.registerCommand("main.hi", () => {
//     vscode.window.showInformationMessage("hi");
//   });
//   context.subscriptions.push(disposable);

  const hoverDisposable = vscode.languages.registerHoverProvider(
    { pattern: "**/*" },
    {
      provideHover(document, position) {
        const content = new vscode.MarkdownString(
          '<img src="main.png" alt=":main:" height="128" width="128">'
        );
        content.isTrusted = true;
        content.supportHtml = true;
        content.supportThemeIcons = true;
        content.baseUri = vscode.Uri.file(
          path.join(context.extensionPath, "src", "images", path.sep)
        );

        const targetText = document.getText(
          document.getWordRangeAtPosition(position)
        );
        // vscode.window.showInformationMessage(text);

        if (targetText.toLocaleLowerCase() !== "main") {
          return;
        }

        return new vscode.Hover(content, new vscode.Range(position, position));
      },
    }
  );
  context.subscriptions.push(hoverDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
