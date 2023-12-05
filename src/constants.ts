import { SnowFlakeConfig, Snowflake } from "snowflake-uid";

type FileType = "html" | "css" | "js" | "scss" | "less" | "json";

type File = {
  name: string;
  content: string;
  type: FileType;
  id: string;
  isNew?: boolean;
  compileToType?: FileType;
};

type initialCodesType = {
  html: string;
  css?: string;
  js?: string;
  scss?: string;
  less?: string;
  json?: string;
};

const initialCodes: initialCodesType = {
  html: `<!-- the code you write here is registered in the body -->

<h1>My First Heading</h1>
<p>My first paragraph.</p>
`,
  css: `/* Start your CSS styling journey! */`,
  js: `// Start coding your own logic, no limits!`,
  scss: `/*
  Start your SCSS styling journey!
  all .SCSS files will be compiled to css on ZIP and HTML exports
*/`,
  less: `/*
  Start your LESS styling journey!
  all .LESS files will be compiled to css on ZIP and HTML exports
*/`,
};

const config: SnowFlakeConfig = {
  epoch: 1641043200, // Set the epoch to January 1, 2023 at 00:00:00
  workerId: 1,
  processId: 1,
  toString: true,
};

const snowflake = new Snowflake(config);
const initialFiles: File[] = [
  {
    name: "index.html",
    content: initialCodes.html || "",
    type: "html",
    id: String(snowflake.generate()),
  },
];

const ModalStyles = (maxWidth: string) => ({
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "95%",
    maxWidth: maxWidth || "650px",
    minHeight: "200px",
    height: "max-content",
    maxHeight: "700px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    background: "#212529",
    borderRadius: "9px",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1000,
  },
});
const ConfirmationModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "95%",
    maxWidth: "500px",
    minHeight: "100px",
    height: "max-content",
    maxHeight: "700px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0 15px",
    background: "#212529",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1000,
  },
};

type keyboardShortcutsType = {
  name: string;
  keys: {
    name: string;
    size: "large" | "normal";
  }[];
};

const keyboardShortcuts: keyboardShortcutsType[] = [
  {
    name: "Export as .zip",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Alt",
        size: "large",
      },
      {
        name: "z",
        size: "normal",
      },
    ],
  },
  {
    name: "Export as .html",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Alt",
        size: "large",
      },
      {
        name: "h",
        size: "normal",
      },
    ],
  },
  {
    name: "Export as .sif",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Alt",
        size: "large",
      },
      {
        name: "s",
        size: "normal",
      },
    ],
  },
  {
    name: "delete file",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Alt",
        size: "large",
      },
      {
        name: "⌫",
        size: "normal",
      },
    ],
  },
  {
    name: "Navigate to next file",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Alt",
        size: "large",
      },
      {
        name: "→",
        size: "normal",
      },
    ],
  },
  {
    name: "Navigate to previous file",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Alt",
        size: "large",
      },
      {
        name: "←",
        size: "normal",
      },
    ],
  },
  {
    name: "toggle view",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Alt",
        size: "large",
      },
      {
        name: "V",
        size: "normal",
      },
    ],
  },
  {
    name: "reverse view",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Alt",
        size: "large",
      },
      {
        name: "R",
        size: "normal",
      },
    ],
  },
  {
    name: "toggle theme",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Alt",
        size: "large",
      },
      {
        name: "t",
        size: "normal",
      },
    ],
  },
  {
    name: "Full screens",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Alt",
        size: "large",
      },
      {
        name: "f",
        size: "normal",
      },
    ],
  },
  {
    name: "Show shortcuts",
    keys: [
      { name: "Ctrl", size: "large" },
      { name: "Alt", size: "large" },
      { name: "/", size: "normal" },
    ],
  },
  {
    name: "rename file",
    keys: [
      {
        name: "f2",
        size: "normal",
      },
    ],
  },
];

const iframeSetUp = `
const handleShortcut = (event) => {
  const key = event.key.toLowerCase(); // Convert key to lowercase

  parent.postMessage(key, "*");
  if (event.ctrlKey && event.altKey && key === "z") {
    parent.postMessage("downloadProject", "*");
  }
  if (event.ctrlKey && event.altKey && key === "backspace") {
    parent.postMessage("deleteFile", "*");
  }
  if (key === "enter") {
    parent.postMessage("enter", "*");
  }
  if (key === "escape") {
    parent.postMessage("escape", "*");
  }
  if (event.ctrlKey && event.altKey && key === "arrowright") {
    parent.postMessage("navigateNext", "*");
  }
  if (event.ctrlKey && event.altKey && key === "arrowleft") {
    parent.postMessage("navigatePrevious", "*");
  }
  if (event.ctrlKey && event.altKey && key === "v") {
    parent.postMessage("toggleView", "*");
  }
  if (event.ctrlKey && event.altKey && key === "r") {
    parent.postMessage("reverseView", "*");
  }
  if (event.ctrlKey && event.altKey && key === "t") {
    parent.postMessage("toggleTheme", "*");
  }
  if (event.ctrlKey && event.altKey && key === "f") {
    parent.postMessage("toggleFullScreen", "*");
  }
  if (event.ctrlKey && key === "/") {
    parent.postMessage("showShortcuts", "*");
  }
  if (key === "f2") {
    parent.postMessage("renameFile", "*");
  }
};

document.addEventListener("keydown", handleShortcut);
document.addEventListener("click", () => {
  parent.postMessage("click", "*");
});

`;

const moreProjects = [
  {
    name: "css path-clip",
    link: "clip.sifedine.com",
  },
  {
    name: "blob generator",
    link: "blob.sifedine.com",
  },
  {
    name: "dev portfolio",
    link: "sifedine.com",
  },
];

export {
  initialFiles,
  initialCodes,
  ModalStyles,
  ConfirmationModalStyles,
  keyboardShortcuts,
  iframeSetUp,
  moreProjects,
  snowflake,
};
export type { File, FileType };
