import { FC, useState } from "react";
import * as assets from "@/assets";

import {
  Menu,
  Item,
  Separator,
  useContextMenu,
  Submenu,
} from "react-contexify";
import Image from "next/image";
import ShortcutGuid from "./ShortcutsGuide";
import { moreProjects } from "@/constants";
import { useCodeContext } from "@/contexts/CodeContext";
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
  const { smallScreen } = useCodeContext();
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
      <Menu id={MENU_ID} theme="dark">
        <Item>
          <a
            href="https://github.com/dev-pengi/sif-code"
            target="_blank"
            className="w-full h-full flex items-center"
          >
            <Image
              src={assets.githubIcon}
              alt={`github project`}
              width={25}
              className="min-w-[25px]"
            />
            <span className="ml-[10px]">github project</span>
          </a>
        </Item>

        {smallScreen ? (
          <>
            <Separator />
            {moreProjects.map((project, index: number) => (
              <Item key={index}>
                <a
                  href={`https://${project.link}`}
                  target="_blank"
                  className="w-full h-full flex items-center"
                >
                  <Image
                    src={project.icon}
                    alt={project.name}
                    width={25}
                    className="min-w-[25px]"
                  />
                  <span className="ml-[10px]">{project.name}</span>
                </a>
              </Item>
            ))}
          </>
        ) : (
          <Submenu
            label={
              <>
                <Image
                  src={assets.devIcon}
                  alt={`creator portfolio`}
                  width={25}
                  className="min-w-[25px]"
                />
                <span className="ml-[10px]">more projects</span>
              </>
            }
          >
            {moreProjects.map((project, index: number) => (
              <Item key={index}>
                <a
                  href={`https://${project.link}`}
                  target="_blank"
                  className="w-full h-full flex items-center"
                >
                  <Image
                    src={project.icon}
                    alt={project.name}
                    width={25}
                    className="min-w-[25px]"
                  />
                  <span className="ml-[10px]">{project.name}</span>
                </a>
              </Item>
            ))}
          </Submenu>
        )}

        <Separator />
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
