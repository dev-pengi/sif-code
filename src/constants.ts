type FileType = "html" | "css" | "js";

type File = {
  name: string;
  content: string;
  type: FileType;
  isNew?: boolean;
};

type initialCodesType = {
  html: string;
  css?: string;
  js?: string;
};

const initialCodes: initialCodesType = {
  html: `<!-- the code you write here is registred in the body -->

<h1>My First Heading</h1>
<p>My first paragraph.</p>
`,
};

const initialFiles: File[] = [
  {
    name: "index.html",
    content: initialCodes.html || "",
    type: "html",
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
}[];

const keyboardShortcuts = [
  {
    name: "Download project",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Shift",
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
        name: "Shift",
        size: "large",
      },
      {
        name: "⌫",
        size: "normal",
      },
    ],
  },
  {
    name: "toggle view",
    keys: [
      { name: "Ctrl", size: "large" },
      {
        name: "Shift",
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
        name: "Shift",
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
        name: "Shift",
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
        name: "Shift",
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

export {
  initialFiles,
  initialCodes,
  ModalStyles,
  ConfirmationModalStyles,
  keyboardShortcuts,
};
export type { File, FileType };
