"use client";
import { useCodeContext } from "@/contexts/CodeContext";
import { FC } from "react";
import NavButton from "./NavButton";
import { devIcon } from "@/assets";

const Nav: FC = () => {
  const { smallScreen } = useCodeContext();
  return (
    <nav className="h-navD bg-transparent fixed top-0">
      <div>
        <div></div>
        <div>
          <NavButton
            icon={devIcon}
            tooltip="more project"
            id={"dev link"}
            link={"https://sifedine.com"}
          />
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default Nav;
