import { File } from "@/constants";

const getHtmlFile = (files: File[]): File => {
  return files.find(
    (file) => file.type === "html" && file.name === "index.html"
  ) as File;
};

const getCssFiles = (
  files: File[]
): { names: string[]; merged: string } | null => {
  const cssFiles = files.filter((file) => file.type === "css");

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

const linkFiles = (files: File[]): File[] => {
  const htmlFile = getHtmlFile(files);
  const cssFiles = getCssFiles(files);
  const jsFiles = getJsFiles(files);

  const mappedCssFiles =
    cssFiles?.names
      .map((name) => {
        return `<link rel="stylesheet" href="${name}">`;
      })
      .join("\n") ?? "";
  const mappedJsFiles =
    jsFiles?.names
      .map((name) => {
        return `<script src="${name}"></script>`;
      })
      .join("\n") ?? "";

  const linked = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>OutPut</title>
            ${mappedCssFiles}
        </head>
        <body>
            ${htmlFile?.content}
            ${mappedJsFiles}
        </body>
    </html>
    `;

  const newFiles: File[] = [
    ...files,
    {
      name: "index.html",
      content: linked,
      type: "html",
    },
  ];
  return newFiles;
};

const mergeFile = (files: File[]) => {
  const htmlFile = getHtmlFile(files);
  const cssFiles = getCssFiles(files);
  const jsFiles = getJsFiles(files);
  const result = `
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <title>OutPut</title>
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
          </body>
      </html>
      `;
  return result;
};

export { getHtmlFile, getCssFiles, getJsFiles, mergeFile, linkFiles };
