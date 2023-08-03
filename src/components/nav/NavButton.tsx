import React from "react";
import Image from "next/image";
import { FC } from "react";
import { Tooltip } from "react-tooltip";

interface NavButtonProps {
  icon: any;
  tooltip: string;
  id: string;
  link?: string;
  onClick?: () => void;
}

const NavButton: FC<NavButtonProps> = ({
  icon,
  tooltip,
  id,
  link,
  onClick,
}) => {
  return (
    <>
      {link ? (
        <a
          data-tooltip-id={id}
          data-tooltip-content={tooltip}
          className="bg-dark rounded-md"
          href={link}
        >
          <Image src={icon} alt={tooltip} />
        </a>
      ) : (
        <button
          data-tooltip-id={id}
          data-tooltip-content={tooltip}
          className="bg-dark rounded-md"
          onClick={onClick}
        >
          <Image src={icon} alt={tooltip} />
        </button>
      )}
      <Tooltip place="bottom" />
    </>
  );
};

export default NavButton;
