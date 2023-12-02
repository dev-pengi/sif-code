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

interface NavMenuProps {
  showOnclick?: boolean;
  showOnDoubleClick?: boolean;
  showOnContextMenu?: boolean;
  children: React.ReactNode;
}

const NavMenu: FC<NavMenuProps> = ({
  showOnclick = true,
  showOnDoubleClick,
  showOnContextMenu,
  children,
}) => {
  const { smallScreen, setTheme, theme } = useCodeContext();
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
  const handleDarkTheme = () => {
    setTheme("dark");
  };
  const handleLightTheme = () => {
    setTheme("light");
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
        {smallScreen ? (
          <>
            <Item onClick={handleDarkTheme}>
              <div className="w-[22px]">
                {theme === "dark" && <assets.CheckIcon />}
              </div>
              <span className="ml-[10px]">Dark Theme</span>
            </Item>
            <Item onClick={handleLightTheme}>
              <div className="w-[22px]">
                {theme === "light" && <assets.CheckIcon />}
              </div>
              <span className="ml-[10px]">Light Theme</span>
            </Item>
          </>
        ) : (
          <Submenu
            label={
              <>
                <div className="w-[22px]">
                  <assets.ThemeIcon />
                </div>
                <span className="ml-[10px]">Theme</span>
              </>
            }
          >
            <Item onClick={handleDarkTheme} closeOnClick={false}>
              <div className="w-[22px]">
                {theme === "dark" && <assets.CheckIcon />}
              </div>
              <span className="ml-[10px]">Dark Theme</span>
            </Item>
            <Item onClick={handleLightTheme} closeOnClick={false}>
              <div className="w-[22px]">
                {theme === "light" && <assets.CheckIcon />}
              </div>
              <span className="ml-[10px]">Light Theme</span>
            </Item>
          </Submenu>
        )}
        <Separator />
        <Item onClick={openShortcuts}>
          <div className="w-[25px]">
            <assets.ShortcutIcon />
          </div>
          <span className="ml-[10px]">keyboard shortcuts</span>
        </Item>

        <Separator />

        <Item>
          <a
            href="https://github.com/dev-pengi/sif-code"
            target="_blank"
            className="w-full h-full flex items-center"
          >
            <div className="w-[25px]">
              <assets.GithubIcon />
            </div>
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
                  <div className="w-[25px]">
                    <assets.ExternalIcon />
                  </div>
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
                  <div className="w-[25px]">
                    <assets.ExternalIcon />
                  </div>
                  <span className="ml-[10px]">{project.name}</span>
                </a>
              </Item>
            ))}
          </Submenu>
        )}
      </Menu>
      <ShortcutGuid
        closeModal={closeShortcuts}
        openModal={openShortcuts}
        modalIsOpen={shortcutsOpen}
      />
    </>
  );
};

export default NavMenu;
