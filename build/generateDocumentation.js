import fs from "fs";
import path from "path";
import * as config from "../config.caw.js";
import { publishConfig } from "../buildconfig.js";
import * as chalkUtils from "./chalkUtils.js";
import fromConsole from "./fromConsole.js";
import {
  actionConfigs,
  conditionConfigs,
  expressionConfigs,
} from "../dist/exportStep/config.js";
import { exec } from "child_process";

function getFileWithTypeFromFolder(path, fileTypes) {
  const results = [];
  if (!fs.existsSync(path)) {
    return results;
  }
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    const ext = getFileExtension(file);
    if (fileTypes.includes(ext)) {
      results.push(file);
    }
  });
  return results;
}

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

const __dirname = path.resolve("../");

function getCoverImage() {
  const exampleFolderPath = path.join(__dirname, "examples");
  const images = getFileWithTypeFromFolder(exampleFolderPath, [
    "png",
    "gif",
    "jpeg",
  ]);
  for (let i = 0; i < images.length; i++) {
    const imageName = images[i].split(".")[0];
    if (imageName === "cover") {
      return `<img src="./examples/${images[i]}" width="150" /><br>`;
    }
  }
  return '<img src="./src/icon.svg" width="100" /><br>';
}

async function getGithubURL() {
  return new Promise((resolve, reject) => {
    exec("git config --get remote.origin.url", (error, stdout, stderr) => {
      if (error) {
        resolve("");
      } else {
        const githubUrl = stdout.trim();
        // remove .git from the end
        if (githubUrl.endsWith(".git")) {
          resolve(githubUrl.slice(0, -4));
        }
        resolve(githubUrl);
      }
    });
  });
}

export default async function generateDocumentation() {
  if (publishConfig && !publishConfig.autoGenReadme) return false;
  chalkUtils.step("Generating README.md");

  const readme = [];
  readme.push(getCoverImage());
  readme.push(`# ${config.name}`);
  const githubUrl = await getGithubURL();
  if (githubUrl && githubUrl !== "") {
    let addonFileName = `${config.id}-${config.version}.c3addon`;
    readme.push(`### Version ${config.version}`);
    readme.push(``);
    readme.push(
      `[<img src="https://placehold.co/200x50/4493f8/FFF?text=Download&font=montserrat" width="200"/>](${githubUrl}/releases/download/${addonFileName}/${addonFileName})`
    );
    readme.push("<br>");
    readme.push(`<sub> [See all releases](${githubUrl}/releases) </sub> <br>`);
  }

  readme.push("");
  readme.push("---");
  readme.push(`${config.description} <br>`);
  readme.push(`<b><u>Author:</u></b> ${config.author} <br>`);
  if (
    config.website &&
    config.website !== "" &&
    config.website !== "https://www.construct.net"
  ) {
    readme.push(`<b><u>Website:</u></b> ${config.website} <br>`);
  }
  if (publishConfig && publishConfig.addonUrl !== "") {
    readme.push(`<b><u>Addon Url:</u></b> ${config.addonUrl} <br>`);
  }
  //add link to c3ide2-framework
  readme.push(
    `<sub>Made using [CAW](https://marketplace.visualstudio.com/items?itemName=skymen.caw) </sub><br>`
  );
  readme.push(``);

  readme.push(`## Table of Contents`);
  readme.push(`- [Usage](#usage)`);
  readme.push(`- [Examples Files](#examples-files)`);
  readme.push(`- [Properties](#properties)`);
  readme.push(`- [Actions](#actions)`);
  readme.push(`- [Conditions](#conditions)`);
  readme.push(`- [Expressions](#expressions)`);

  readme.push(`---`);
  readme.push(`## Usage`);
  readme.push(`To build the addon, run the following commands:`);
  readme.push(``);
  readme.push(`\`\`\``);
  readme.push(`npm i`);
  readme.push(`npm run build`);
  readme.push(`\`\`\``);
  readme.push(``);
  readme.push(`To run the dev server, run`);
  readme.push(``);
  readme.push(`\`\`\``);
  readme.push(`npm i`);
  readme.push(`npm run dev`);
  readme.push(`\`\`\``);

  readme.push(``);
  readme.push(`## Examples Files`);
  const exampleFolderPath = path.join(__dirname, "examples");
  if (fs.existsSync(exampleFolderPath)) {
    //get all files in examples folder
    const exampleFiles = getFileWithTypeFromFolder(exampleFolderPath, ["c3p"]);
    const images = getFileWithTypeFromFolder(exampleFolderPath, [
      "png",
      "gif",
      "jpeg",
    ]);

    exampleFiles.forEach((file) => {
      const fileName = file.split(".")[0];
      readme.push(`- [${fileName}](./examples/${file})`);

      //add images
      images.forEach((image) => {
        const imageName = image.split(".")[0];
        readme.push(`</br>`);
        //check if image contains the name of the example file
        if (imageName.includes(fileName)) {
          // display the a small version of the image on a new line
          readme.push(`<img src="./examples/${image}" width="200" />`);
        }
      });
      readme.push(`</br>`);
    });
  }

  readme.push(``);
  readme.push(`---`);
  readme.push(`## Properties`);
  readme.push(`| Property Name | Description | Type |`);
  readme.push(`| --- | --- | --- |`);

  config.properties.forEach((property) => {
    readme.push(`| ${property.name} | ${property.desc} | ${property.type} |`);
  });
  readme.push(``);

  readme.push(``);
  readme.push(`---`);
  readme.push(`## Actions`);
  readme.push(`| Action | Description | Params`);
  readme.push(`| --- | --- | --- |`);

  Object.keys(actionConfigs).forEach((key) => {
    const action = actionConfigs[key];

    let paramString = "";
    if (action.params) {
      action.params.forEach((param) => {
        paramString += `${param.name}             *(${param.type})* <br>`;
      });
    }

    readme.push(
      `| ${action.listName} | ${action.description} | ${paramString} |`
    );
  });
  readme.push(``);

  readme.push(``);
  readme.push(`---`);
  readme.push(`## Conditions`);
  readme.push(`| Condition | Description | Params`);
  readme.push(`| --- | --- | --- |`);

  Object.keys(conditionConfigs).forEach((key) => {
    const condition = conditionConfigs[key];

    let paramString = "";
    if (condition.params) {
      condition.params.forEach((param) => {
        paramString += `${param.name} *(${param.type})* <br>`;
      });
    }

    readme.push(
      `| ${condition.listName} | ${condition.description} | ${paramString} |`
    );
  });
  readme.push(``);

  readme.push(``);
  readme.push(`---`);
  readme.push(`## Expressions`);
  readme.push(`| Expression | Description | Return Type | Params`);
  readme.push(`| --- | --- | --- | --- |`);

  Object.keys(expressionConfigs).forEach((key) => {
    const expression = expressionConfigs[key];

    let paramString = "";
    if (expression.params) {
      expression.params.forEach((param) => {
        paramString += `${param.name} *(${param.type})* <br>`;
      });
    }

    readme.push(
      `| ${key} | ${expression.description} | ${expression.returnType} | ${paramString} | `
    );
  });
  readme.push(``);

  fs.writeFileSync(path.join(__dirname, "README.md"), readme.join("\n"));

  chalkUtils.success("README.md generated successfully");

  return false;
}

if (fromConsole(import.meta.url)) {
  chalkUtils.fromCommandLine();
  generateDocumentation();
}
