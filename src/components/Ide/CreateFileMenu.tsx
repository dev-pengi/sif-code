import * as assets from "@/assets";
import { FC } from "react";

import { useFilesContext } from "@/contexts/FilesContext";
import { Item, Menu, Separator, useContextMenu } from "react-contexify";
import { toast } from "react-hot-toast";
import { FileType, initialCodes, snowflake } from "@/constants";
const MENU_ID = "create-file";

type FileCreateType = "css" | "scss" | "less" | "js" | "json";

type FileCreate = {
  type: FileCreateType;
  icon: FC;
  compileToType?: FileType;
  separate?: boolean;
};
const filesCreate: FileCreate[] = [
  {
    type: "css",
    icon: assets.ColoredCssIcon,
    separate: true,
  },
  {
    type: "scss",
    compileToType: "css",
    icon: assets.ColoredScssIcon,
  },
  {
    type: "less",
    compileToType: "css",
    icon: assets.ColoredLessIcon,
    separate: true,
  },
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

    const typeName = typeNames[type] || typeNames.default;
    const newFileCreateDetails = filesCreate.find((file) => file.type === type);
    const typeIndex = files.filter((file) => {
      let isIndexed = false;
      const fileDetails = filesCreate.find(
        (fileCreate) => fileCreate.type === file.type
      );
      if (file.type === type) isIndexed = true;
      if (fileDetails?.compileToType && fileDetails.compileToType === type)
        isIndexed = true;
      if (
        newFileCreateDetails?.compileToType &&
        newFileCreateDetails.compileToType === file.type
      )
        isIndexed = true;

      if (
        newFileCreateDetails?.compileToType &&
        fileDetails?.compileToType &&
        newFileCreateDetails?.compileToType === fileDetails?.compileToType
      )
        isIndexed = true;

      return isIndexed;
    }).length;
    const nameIndex = typeIndex || "";
    const fullName = `${typeName}${nameIndex}.${type}`;
    const fileID = String(snowflake.generate());

    setFiles((prev) => [
      ...prev,
      {
        name: fullName,
        type,
        content: initialCodes[type] || "",
        id: fileID,
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
      <Menu id={MENU_ID} theme="dark" animation={false}>
        {filesCreate.map((fileCreate: FileCreate, index: number) => (
          <>
            <Item
              key={`fileCreate-${index}`}
              onClick={() => handleCreateFile(fileCreate.type)}
            >
              <div className="w-[25px]">
                <fileCreate.icon />
              </div>
              <span className="ml-[10px]">{fileCreate.type}</span>
            </Item>
            {fileCreate.separate && <Separator key={`separator-${index}`} />}
          </>
        ))}
      </Menu>
    </>
  );
};

export default CreateFileMenu;
