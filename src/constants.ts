type FileType = "html" | "css" | "javascript";

type File = {
  name: string;
  content: string;
  type: FileType;
};

type initialCodesType = {
  html: string;
  css?: string;
  js?: string;
};

const initialCodes: initialCodesType = {
  html: `<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
</head>

<body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
</body>

</html>`,
};

const initialFiles: File[] = [
  {
    name: "index.html",
    content: initialCodes.html || "",
    type: "html",
  },
];

export { initialFiles, initialCodes };
export type { File, FileType };
