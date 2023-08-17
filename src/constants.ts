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
    padding: "15px 15px",
    background: "#343436",
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
    maxWidth: "450px",
    minHeight: "100px",
    height: "max-content",
    maxHeight: "700px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "15px 15px",
    background: "#343436",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1000,
  },
};

const keyboardShortcuts = [
  {
    name: "Download project",
    keys: ["Ctrl", "Alt", "S"],
  },
  {
    name: "delete file",
    keys: ["Ctrl", "Alt", "⌫"],
  },
  {
    name: "rename file",
    keys: ["F2"],
  },
  {
    name: "toggle view",
    keys: ["Ctrl", "Alt", "V"],
  },
  {
    name: "reverse view",
    keys: ["Ctrl", "Alt", "R"],
  },
  {
    name: "toggle theme",
    keys: ["Ctrl", "Alt", "T"],
  },
  {
    name: "Full screens",
    keys: ["Ctrl", "Alt", "F"],
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
