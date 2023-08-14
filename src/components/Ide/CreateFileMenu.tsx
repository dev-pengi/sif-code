import { Children, FC, cloneElement, isValidElement } from "react";
import * as assets from "@/assets";

import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import { toast } from "react-hot-toast";
import { useFilesContext } from "@/contexts/FilesContext";
import Image from "next/image";
const MENU_ID = "create-file";

type FileCreateType = "css" | "js";

type FileCreate = {
  type: FileCreateType;
};
const filesCreate: FileCreate[] = [
  {
    type: "css",
  },
  {
    type: "js",
  },
];

interface CreateFileMenuProps {
  showOnclick?: boolean;
  showOnDoubleClick?: boolean;
  showOnContextMenu?: boolean;
  children: React.ReactNode;
}

const CreateFileMenu: FC<CreateFileMenuProps> = ({
  showOnclick = true,
  showOnDoubleClick,
  showOnContextMenu,
  children,
}) => {
  const { setActiveFile, files, setFiles } = useFilesContext();
  const { show } = useContextMenu({
    id: MENU_ID,
  });
  function displayMenu(e: any): any {
    show({
      event: e,
    });
  }

  const handleCreateFile = (type: FileCreateType) => {
    if (!type) return toast.error("Please select a file type");

    const typeIndex = files.filter((file) => file.type === type).length;
    const nameIndex = typeIndex > 0 ? typeIndex : "";
    const typeName = type === "css" ? "style" : type === "js" ? "script" : "";
    const fullName = `${typeName}${nameIndex}.${type}`;

    setFiles((prev) => [
      ...prev,
      {
        name: fullName,
        type,
        content: "",
        isNew: true,
      },
    ]);
    setActiveFile(fullName);
    toast.success("File created successfully");
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
      <Menu id={MENU_ID} theme="dark" animation="fade">
        {filesCreate.map((fileCreate: FileCreate, index: number) => (
          <>
            <Item key={index} onClick={() => handleCreateFile(fileCreate.type)}>
              <Image
                src={assets[`${fileCreate.type}Icon`]}
                alt={`${fileCreate.type} icon`}
                width={25}
                className="min-w-[25px]"
              />
              <span className="ml-[10px]">{fileCreate.type}</span>
            </Item>
            {index < filesCreate.length - 1 && <Separator />}
          </>
        ))}
      </Menu>
    </>
  );
};

export default CreateFileMenu;
