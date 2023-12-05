import { ReactNode } from "react";
import { FC } from "react";
import { Tooltip } from "react-tooltip";
import { useCodeContext } from "@/contexts/CodeContext";

interface NavButtonProps {
  Icon: FC;
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
  Icon,
  tooltip,
  id,
  link,
  onClick,
}) => {
  const { smallScreen } = useCodeContext();

  return (
    <>
      <LinkOrButton
        className="bg-transparent text-white hover:bg-main-lighter duration-75 rounded-md py-2 vsm:px-3 px-2 w-max"
        href={link}
        onClick={onClick}
        data-tooltip-id={id}
        data-tooltip-content={tooltip}
      >
        <div className="w-[25px]">
          <Icon />
        </div>
      </LinkOrButton>
      <Tooltip
        place={"bottom"}
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
