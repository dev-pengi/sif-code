import { Children, FC, cloneElement, isValidElement, useState } from "react";
import * as assets from "@/assets";

import { Menu, Item, Separator, useContextMenu } from "react-contexify";
import Image from "next/image";
import ShortcutGuid from "./ShortcutsGuide";
const MENU_ID = "info-menu";

interface InfoMenuProps {
  showOnclick?: boolean;
  showOnDoubleClick?: boolean;
  showOnContextMenu?: boolean;
  children: React.ReactNode;
}

const InfoMenu: FC<InfoMenuProps> = ({
  showOnclick = true,
  showOnDoubleClick,
  showOnContextMenu,
  children,
}) => {
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
        <Item>
          <a
            href="https://sifedine.com"
            target="_blank"
            className="w-full h-full flex items-center"
          >
            <Image
              src={assets.devIcon}
              alt={`creator portfolio`}
              width={25}
              className="min-w-[25px]"
            />
            <span className="ml-[10px]">creator's portfolio</span>
          </a>
        </Item>
        <Item onClick={openShortcuts}>
          <Image
            src={assets.shortcutIcon}
            alt={`keyboard shortcuts`}
            width={25}
            className="min-w-[25px]"
          />
          <span className="ml-[10px]">keyboard shortcuts</span>
        </Item>
      </Menu>
      <ShortcutGuid
        closeModal={closeShortcuts}
        openModal={openShortcuts}
        modalIsOpen={shortcutsOpen}
      />
    </>
  );
};

export default InfoMenu;
