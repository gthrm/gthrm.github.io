---
title: "Customize Indentation Guides in VS Code"
date: "2024-11-12"
lang: "eng"
type: "main"
description: "Enhance readability in Visual Studio Code by setting up colorful indentation guides. This guide helps you navigate code structure with ease and reduce eye strain."
keywords: "VS Code indentation guides, Visual Studio Code customization, code readability, coding environment setup, color-coded indentation, VS Code settings, developer productivity, file structure navigation"
---

![Preview](https://cloud.cdroma.me/upload/d070e9d4-becc-4b45-91d3-c7f1e3fc5ab7-1731433758922.png)

Setting up indentation guides in Visual Studio Code helps you see folder structure clearly, making it easier to find what you need without straining your eyes.

## Steps to Configure Indentation Guides

1. **Open Settings JSON**

Press `Cmd + Shift + P` (or `Ctrl + Shift + P` on Windows/Linux) to open the command palette, then type and select **Preferences: Open Settings (JSON)**.

2. **Add Color Customization**

In the `settings.json` file, add the following code to customize the color of the indentation guides:

```json
"workbench.tree.renderIndentGuides": "always",
"workbench.colorCustomizations": {
   "tree.indentGuidesStroke": "#05ef3c"
},
```

3. **Adjust Indentation Width (Optional)**

To change the width of indentation levels, add this line:

```json
"workbench.tree.indent": 15, // Adjust as needed
```

4. **Save and Restart**

Save `settings.json`, then restart VS Code to see your new indentation guides.

## Thank You

Enjoy coding with a cleaner view!
