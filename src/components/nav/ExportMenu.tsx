"use client";
import { FilesIcon, HtmlIcon, ShareIcon, SifFileIcon, ZipIcon } from "@/assets";
import { useFilesContext } from "@/contexts/FilesContext";
import {
  downloadFilesAsZip,
  linkFiles,
  exportAsSif,
  ExportAsHtml,
  convertToBinary,
  copyText,
  parseBinarySif,
} from "@/utils";
import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { Item, Menu, Separator, useContextMenu } from "react-contexify";
import toast from "react-hot-toast";
const MENU_ID = "download_menu";

interface DownloadMenuProps {
  showOnclick?: boolean;
  showOnDoubleClick?: boolean;
  showOnContextMenu?: boolean;
  children: React.ReactNode;
}

const DownloadMenu: FC<DownloadMenuProps> = ({
  showOnclick = true,
  showOnDoubleClick,
  showOnContextMenu,
  children,
}) => {
  const { files, setFiles, projectName, setProjectName } = useFilesContext();
  const fileRef = useRef(null);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const openShortcuts = (): void => {
    setShortcutsOpen(true);
  };

  function closeShortcuts() {
    setShortcutsOpen(false);
  }

  const { show } = useContextMenu({
    id: MENU_ID,
  });
  function displayMenu(e: any): any {
    show({
      event: e,
    });
  }
  const handleZipExport = async () => {
    const linkedFiles = await linkFiles(files, projectName);
    downloadFilesAsZip(linkedFiles, projectName);
    toast.success("Project downloaded successfully");
  };

  const handleSifExport = () => {
    exportAsSif(files, projectName);
    toast.success("Project exported successfully");
  };

  const handleHtmlExport = () => {
    ExportAsHtml(files, projectName);
    toast.success("Project exported successfully");
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "z") {
        handleZipExport();
      } else if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "s") {
        handleSifExport();
      } else if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "h") {
        handleHtmlExport();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const receiveShortcutMessage = (event: MessageEvent) => {
    const action = event.data;

    if (action === "exportZip") {
      handleZipExport();
    }
  };

  useEffect(() => {
    window.addEventListener("message", receiveShortcutMessage);
    return () => {
      window.removeEventListener("message", receiveShortcutMessage);
    };
  }, []);

  const handleFileBrowsing = () => {
    if (!fileRef.current) return;
    const fileInput = fileRef.current as HTMLInputElement;
    fileInput.value = "";
    fileInput.click();
  };

  const handleFileChange = async () => {
    if (!fileRef.current) return toast.error("error");
    const fileInput = fileRef.current as HTMLInputElement;
    if (!fileInput || !fileInput.files) {
      toast.error("No file selected");
      return;
    }

    const selectedFile = fileInput.files[0];
    const fileName = selectedFile.name;

    if (!fileName.endsWith(".sif")) {
      toast.error("Invalid file format. Please select a .sif file.");
      return;
    }

    const handleImport = async () => {
      const fileData = await readFileData(selectedFile);
      const jsonData = parseBinarySif(fileData);
      setFiles(jsonData.files);
      setProjectName(jsonData.projectName);
    };

    toast.promise(handleImport(), {
      loading: "Decoding the file...",
      success: <>Project has been imported!</>,
      error: <>Error decoding imported file!.</>,
    });
  };
  const readFileData = (file: any) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result as string;
        resolve(result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  };

  const generateProjectLink = async () => {
    const TOKEN =
      "e9bcf8e75f1cdcca89c815aab5e656a6190832a3b87af5e1accefbc63a69061340e3f5d98860ef4e7dd7fef1f012b6ab4782045d4a13c724dd9534fda84a6c63";
    const headers = {
      "content-type": " text/plain",
      Authorization: `Bearer ${TOKEN}`,
    };
    const endpoint = "https://hastebin.com/documents";
    const projectData = convertToBinary(files, projectName);

    let { data } = await axios.post(endpoint, projectData, {
      headers,
    });
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const projectURL = `${window.location.protocol}//${hostname}${
        window.location.port ? `:${window.location.port}` : ""
      }/?import=${data.key}`;
      copyText(projectURL);
    }
  };

  const handleProjectShare = async () => {
    toast.promise(generateProjectLink(), {
      loading: "Uploading the project...",
      success: <>Project link has been copied to clipboard!</>,
      error: <>Error while uploading the project!.</>,
    });
  };

  return (
    <>
      <div
        onClick={showOnclick ? displayMenu : () => {}}
        onDoubleClick={showOnDoubleClick ? displayMenu : () => {}}
        onContextMenu={showOnContextMenu ? displayMenu : () => {}}
      >
        {children}
      </div>
      <Menu id={MENU_ID} theme="dark" animation={false}>
        <Item onClick={handleFileBrowsing}>
          <div className="w-[25px]">
            <FilesIcon />
          </div>
          <span className="ml-[10px]">Import Project</span>
        </Item>
        <Separator />
        <Item onClick={handleZipExport}>
          <div className="w-[25px]">
            <ZipIcon />
          </div>
          <span className="ml-[10px]">
            <span>Export as</span> <span className="font-bold ml-1">ZIP</span>
          </span>
        </Item>
        <Item onClick={handleHtmlExport}>
          <div className="w-[25px]">
            <HtmlIcon />
          </div>
          <span className="ml-[10px]">
            <span>Export as</span> <span className="font-bold ml-1">HTML</span>
          </span>
        </Item>
        <Separator />
        <Item onClick={handleSifExport}>
          <div className="w-[25px]">
            <SifFileIcon />
          </div>
          <span className="ml-[10px]">
            <span>Export as</span> <span className="font-bold ml-1"> .sif</span>
          </span>
        </Item>
        <Separator />
        <Item onClick={handleProjectShare}>
          <div className="w-[25px]">
            <ShareIcon />
          </div>
          <span className="ml-[10px]">Share Project Link</span>
        </Item>
      </Menu>
      <input
        type="file"
        ref={fileRef}
        accept=".sif"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default DownloadMenu;
