"use client";
import { useFilesContext } from "@/contexts/FilesContext";
import { downloadFilesAsZip, linkFiles } from "@/utils";
import exportAsSif from "@/utils/ExportAsSif";
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
  const { files, setFiles } = useFilesContext();
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
  const handleZipExport = () => {
    const linkedFiles = linkFiles(files);
    downloadFilesAsZip(linkedFiles, "project");
    toast.success("Project downloaded successfully");
  };

  const handleSifExport = () => {
    exportAsSif(files, "project");
    toast.success("Project exported successfully");
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "z") {
        handleZipExport();
      } else if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "s") {
        handleSifExport();
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
    fileInput.value = '';
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

    try {
      const fileData = await readFileData(selectedFile);
      const jsonData = parseBinarySif(fileData);
      setFiles(jsonData);
      toast.success("Project has been imported");
    } catch (error) {
      toast.error("Error decoding imported file");
    }
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

  const parseBinarySif = (binaryData: any) => {
    const text = convertToText(binaryData);
    return JSON.parse(text);
  };
  const convertToText = (binaryData: any) => {
    return atob(binaryData);
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
      <Menu id={MENU_ID} theme="dark">
        <Item onClick={handleZipExport}>
          <span>Export as</span> <span className="font-bold ml-1"> .zip</span>
        </Item>
        <Item>
          <span>Export as</span> <span className="font-bold ml-1"> .html</span>
        </Item>
        <Separator />
        <Item onClick={handleSifExport}>
          <span>Export as</span> <span className="font-bold ml-1"> .sif</span>
        </Item>
        <Item onClick={handleFileBrowsing}>
          <span>Import </span> <span className="font-bold ml-1"> .sif </span>
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
