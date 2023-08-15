import { FC } from "react";
import "./styles/preloader.css";

const PreLoader: FC = () => {
  return (
    <div className="loader-container">
      <div className="pre-loader"></div>
    </div>
  );
};

export default PreLoader;
