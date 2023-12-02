import { saveAs } from "file-saver";
import { File } from "@/constants";

const exportAsSif = (files: File[], projectName: string): void => {
  const binaryData = convertToBinary(files, projectName);
  const blob = new Blob([binaryData], { type: "application/octet-stream" });
  const fileName = `${projectName}.sif`;

  saveAs(blob, fileName);
};

export function convertToBinary(
  files: File[],
  projectName: string
): Uint8Array {
  const exportJSON = {
    projectName: projectName,
    lastExport: Date.now(),
    files: files.map((file) => ({ ...file, isNew: false })),
  };
  const serializedData = JSON.stringify(exportJSON, null, 2);

  const binaryString = window.btoa(
    unescape(encodeURIComponent(serializedData))
  );
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

export const convertToText = (binaryData: any) => {
  return atob(binaryData);
};
export const parseBinarySif = (binaryData: any) => {
  const text = convertToText(binaryData);
  return JSON.parse(text);
};
export default exportAsSif;
