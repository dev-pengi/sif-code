import { ReactNode } from "react";
import Image from "next/image";
import { FC } from "react";
import { Tooltip } from "react-tooltip";
import { useCodeContext } from "@/contexts/CodeContext";

interface NavButtonProps {
  icon: any;
  tooltip: string;
  id: string;
  link?: string;
  onClick?: () => void;
}

interface LinkOrButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  "data-tooltip-id": string;
  "data-tooltip-content": string;
}

const LinkOrButton: FC<LinkOrButtonProps> = ({
  children,
  className,
  href,
  onClick,
  "data-tooltip-id": dataTooltipId,
  "data-tooltip-content": dataTooltipContent,
}) => {
  if (href) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        data-tooltip-id={dataTooltipId}
        data-tooltip-content={dataTooltipContent}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={className}
        data-tooltip-id={dataTooltipId}
        data-tooltip-content={dataTooltipContent}
      >
        {children}
      </button>
    );
  }
};

const NavButton: FC<NavButtonProps> = ({
  icon,
  tooltip,
  id,
  link,
  onClick,
}) => {
  const { smallScreen } = useCodeContext();

  return (
    <>
      <LinkOrButton
        className="bg-dark rounded-md py-2 vsm:px-4 px-3"
        href={link}
        onClick={onClick}
        data-tooltip-id={id}
        data-tooltip-content={tooltip}
      >
        <Image src={icon} alt={tooltip} width={25} />
      </LinkOrButton>
      <Tooltip
        place={smallScreen ? "right" : "bottom"}
        offset={18}
        style={{ background: "#3498db" }}
        border={"#111111"}
        noArrow
        id={id}
      />
    </>
  );
};

export default NavButton;
