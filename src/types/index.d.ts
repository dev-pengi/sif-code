import { Monaco } from "@monaco-editor/react";

export {};

declare global {
  interface Window {
    monaco: Monaco;
  }
}
