import { FC } from "react";

interface InfoIconProps {
  // Add your prop types here
}

const InfoIcon: FC<InfoIconProps> = () => {
  return (
    <svg
      width="100%"
       
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />

      <g id="Complete">
        <g id="info-circle">
          <g>
            <circle
              cx="12"
              cy="12"
              data-name="--Circle"
              fill="none"
              id="_--Circle"
              r="10"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />

            <line
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              x1="12"
              x2="12"
              y1="12"
              y2="16"
            />

            <line
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              x1="12"
              x2="12"
              y1="8"
              y2="8"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default InfoIcon;
