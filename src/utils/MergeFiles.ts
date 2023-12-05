import { File, iframeSetUp } from "@/constants";
import prettier from "prettier/standalone";
import prettierHtmlPlugins from "prettier/plugins/html";
import * as sass from "sass";
import * as less from "less";

const getHtmlFile = (files: File[]): File => {
  return files.find(
    (file) => file.type === "html" && file.name === "index.html"
  ) as File;
};
const compileCssProcessors = async (files: File[]): Promise<File[] | []> => {
  const proFiles = files.filter(
    (file) => file.type === "scss" || file.type === "less"
  );
  const compiledFiles: File[] = [];

  for (const file of proFiles) {
    try {
      let compiledFile = { css: "" };
      if (file.type === "scss") {
        compiledFile = await sass.compileStringAsync(file.content);
      } else {
        compiledFile = await less.render(file.content);
      }
      const fileName = file.name.split(".")[0];
      const fullFileName = `${fileName}.css`;

      compiledFiles.push({
        ...file,
        name: fullFileName,
        type: "css",
        content: compiledFile.css,
      });
    } catch (error) {
      continue;
    }
  }
  return compiledFiles;
};

const getCssFiles = async (
  files: File[]
): Promise<{ names: string[]; merged: string } | null> => {
  const cssFiles = files.filter((file) => file.type === "css");
  const compiledCssFiles = await compileCssProcessors(files);
  cssFiles.push(...compiledCssFiles);

  if (cssFiles.length === 0) return null;

  return {
    names: cssFiles.map((file) => file.name),
    merged: cssFiles.reduce((acc, file) => {
      return acc + file.content;
    }, ""),
  };
};

const getJsFiles = (
  files: File[]
): { names: string[]; merged: string } | null => {
  const jsFiles = files.filter((file) => file.type === "js");

  if (jsFiles.length === 0) return null;

  return {
    names: jsFiles.map((file) => file.name),
    merged: jsFiles.reduce((acc, file) => {
      return acc + file.content + "\n";
    }, ""),
  };
};

const getIframeScripts = (): string => {
  return iframeSetUp;
};

function resolveNamingConflicts(files: File[]): File[] {
  const nameCountMap: Record<string, number> = {};

  // Count occurrences of each name
  files.forEach((file) => {
    nameCountMap[file.name] = (nameCountMap[file.name] || 0) + 1;
  });

  // Resolve conflicts by appending a number to duplicate names
  return files.map((file) => {
    if (nameCountMap[file.name] > 1) {
      const fileName = file.name.split('.')[0]
      const fileExtension = file.name.split('.')[1]
      const newName = `${fileName}_${nameCountMap[file.name]--}.${fileExtension}`;
      return { ...file, name: newName };
    }
    return file;
  });
}

const linkFiles = async (files: File[], projectName: string): Promise<any> => {
  const htmlFile = getHtmlFile(files);
  const jsFiles = files.filter((file) => file.type === "js");
  let cssFiles = files.filter((file) => file.type === "css");

  const compiledCssFiles = await compileCssProcessors(files);
  cssFiles.push(...compiledCssFiles);
  cssFiles = resolveNamingConflicts(cssFiles);

  const mappedCssFiles =
    cssFiles
      ?.map((file) => {
        return `<link rel="stylesheet" href="css/${file.name}">`;
      })
      .join("\n") ?? "";

  const mappedJsFiles =
    jsFiles
      ?.map((file) => {
        return `<script src="javascript/${file.name}"></script>`;
      })
      .join("\n") ?? "";

  const linked = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${projectName}</title>
            ${mappedCssFiles}
        </head>
        <body>
            ${htmlFile?.content}
            ${mappedJsFiles}
        </body>
    </html>
    `;

  const newFiles = [
    {
      type: "folder",
      name: "javascript",
      files: jsFiles,
    },
    {
      type: "folder",
      name: "css",
      files: cssFiles,
    },
    {
      name: "index.html",
      content: linked,
      type: "html",
    },
  ];
  return newFiles;
};

const mergeFile = async (
  files: File[],
  projectName: string,
  devMode: boolean = true
) => {
  const htmlFile = getHtmlFile(files);
  const jsFiles = getJsFiles(files);

  const cssFiles = await getCssFiles(files);

  const result = `
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <title>${projectName}</title>
              ${
                cssFiles
                  ? `
                <style>
                    ${cssFiles?.merged}
                </style>
                `
                  : ""
              }
          </head>
          <body>
              ${htmlFile?.content}
              ${
                jsFiles
                  ? `
                <script>
                    ${jsFiles?.merged}
                </script>
                `
                  : ""
              }

              
              ${
                devMode
                  ? `<script>
              ${getIframeScripts()}
              </script>`
                  : ""
              }
          </body>
      </html>
      `;

  let formattedCode = result;

  try {
    formattedCode = await prettier.format(result, {
      parser: "html",
      plugins: [prettierHtmlPlugins],
    });
  } catch (error) {}

  return formattedCode;
};

export { getHtmlFile, getCssFiles, getJsFiles, mergeFile, linkFiles };
