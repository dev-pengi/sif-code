import JSZip from "jszip";
import { saveAs } from "file-saver";
import { File } from "@/constants";

const downloadFilesAsZip = (files: any[], folderName: string) => {
  const zip = new JSZip();
  const folder = zip.folder(folderName);

  files.forEach((file) => {
    if (file.type === "folder") {
      const nestedFolder = folder?.folder(file.name);
      file.files.forEach((folderFile: File) => {
        nestedFolder?.file(folderFile.name, folderFile.content);
      });
    } else {
      folder?.file(file.name, file.content);
    }
  });

  zip
    .generateAsync({ type: "blob" })
    .then((blob) => {
      saveAs(blob, `${folderName}.zip`);
    })
    .catch((error) => {
      console.error("Error generating the zip file:", error);
    });
};

export default downloadFilesAsZip;
