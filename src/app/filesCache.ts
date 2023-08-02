import { File, FileType } from "@/constants";

let files: File[] = [];

const UpdateFiles = (newFiles: File[]): File[] => {
  files = newFiles;
  return files;
};

const GetFiles = (): File[] => {
  return files;
};

const getFile = (filename: string): File => {
  const file = files.find((file) => file.name === filename) as File;
  return file;
};

const updateFile = (
  filename: string,
  content: string,
  type?: FileType,
  newName?: string
): File => {
  const file = getFile(filename);
  if (file) {
    file.content = content;
    if (type) file.type = type;
    if (newName) file.name = newName;

    files = files.map((f) => {
      if (f.name === filename) return file;
      return f;
    });
  }
  return file;
};

export { files, UpdateFiles, GetFiles, getFile, updateFile };