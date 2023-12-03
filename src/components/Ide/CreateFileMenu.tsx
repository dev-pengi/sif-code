import * as assets from "@/assets";
import { FC } from "react";

import { useFilesContext } from "@/contexts/FilesContext";
import { Item, Menu, Separator, useContextMenu } from "react-contexify";
import { toast } from "react-hot-toast";
import { initialCodes } from "@/constants";
const MENU_ID = "create-file";

type FileCreateType = "css" | "scss" | "less" | "js" | "json";

type FileCreate = {
  type: FileCreateType;
  icon: FC;
  separate?: boolean;
};
const filesCreate: FileCreate[] = [
  {
    type: "css",
    icon: assets.ColoredCssIcon,
    separate: true,
  },
  // {
  //   type: "scss",
  //   icon: assets.ColoredScssIcon,
  // },
  // {
  //   type: "less",
  //   icon: assets.ColoredLessIcon,
  //   separate: true,
  // },
  {
    type: "js",
    icon: assets.ColoredJsIcon,
    // separate: true,
  },
  // {
  //   type: "json",
  //   icon: assets.ColoredJsonIcon,
  // },
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

    const typeNames: any = {
      css: "style",
      scss: "style",
      less: "style",
      js: "script",
      json: "data",
      default: "file",
    };

    const typeIndex = files.filter((file) => file.type === type).length;
    const nameIndex = typeIndex > 0 ? typeIndex : "";
    const typeName = typeNames[type] || typeNames.default;
    const fullName = `${typeName}${nameIndex}.${type}`;

    setFiles((prev) => [
      ...prev,
      {
        name: fullName,
        type,
        content: initialCodes[type] || "",
        isNew: true,
      },
    ]);
    setActiveFile(fullName);
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
              <div className="w-[25px]">
                <fileCreate.icon />
              </div>
              <span className="ml-[10px]">{fileCreate.type}</span>
            </Item>
            {fileCreate.separate && <Separator />}
          </>
        ))}
      </Menu>
    </>
  );
};

export default CreateFileMenu;
