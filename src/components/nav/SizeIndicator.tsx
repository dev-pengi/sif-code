import { useCodeContext } from "@/contexts/CodeContext";
import { FC } from "react";

const SizeIndicator: FC = () => {
  const { previewWidth, previewHeight } = useCodeContext();
  return (
    <p className="flex-1 text-end text-white">
      {previewWidth} x {previewHeight}
    </p>
  );
};

export default SizeIndicator;
