import { saveAs } from "file-saver";
import { File } from "@/constants";
import { mergeFile } from ".";

const ExportAsHtml = async (files: File[], projectName: string) => {
  const htmlContent = await mergeFile(files,projectName, false);

  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  saveAs(blob, `${projectName}.html`);
};

export default ExportAsHtml;
