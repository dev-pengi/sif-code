import { useCodeContext } from "@/contexts/CodeContext";
import { FC } from "react";

const SizeIndicator: FC = () => {
  const { previewWidth, previewHeight } = useCodeContext();
  return (
    <p className="flex-1 items-end text-end text-white min-w-max">
          {previewWidth} x {previewHeight}
    </p>
  );
};

export default SizeIndicator;
