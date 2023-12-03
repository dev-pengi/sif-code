import { FC } from "react";

const ColoredLessIcon: FC = () => {
  return (
    <svg
      fill="#000000"
      width="100%"
      viewBox="0 0 24 24"
      id="bracket-3"
      data-name="Line Color"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="secondary"
        d="M15,3h1a2,2,0,0,1,2,2v5a2,2,0,0,0,2,2h0a2,2,0,0,0-2,2v5a2,2,0,0,1-2,2H15"
        fill="none"
        stroke="#2ca9bc"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={"2"}
      ></path>
      <path
        id="primary"
        d="M9,3H8A2,2,0,0,0,6,5v5a2,2,0,0,1-2,2H4a2,2,0,0,1,2,2v5a2,2,0,0,0,2,2H9"
        fill="none"
        stroke="#2ca9bc"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={"2"}
      ></path>
    </svg>
  );
};

export default ColoredLessIcon;
