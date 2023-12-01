import { saveAs } from "file-saver";
import { File } from "@/constants";

const exportAsSif = (files: File[], projectName: string): void => {
  const exportJSON = {
    projectName: projectName,
    lastExport: Date.now(),
    files: files.map((file) => ({ ...file, isNew: false })),
  };
  const serializedData = JSON.stringify(exportJSON, null, 2);

  const binaryData = convertToBinary(serializedData);
  const blob = new Blob([binaryData], { type: "application/octet-stream" });
  const fileName = `${projectName}.sif`;

  saveAs(blob, fileName);
};

function convertToBinary(text: string): Uint8Array {
  const binaryString = window.btoa(unescape(encodeURIComponent(text)));
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

export default exportAsSif;
