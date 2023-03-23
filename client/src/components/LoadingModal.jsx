import React from "react";
import { ImSpinner2 } from "react-icons/im";

const LoadingModal = () => {
  return (
    <div className="fixed z-[999] left-0 top-0 backdrop-blur-sm flex items-center justify-center w-screen h-screen select-none">
      <div className="bg-white rounded-lg p-5 border">
        <div className="flex items-center justify-center">
          <ImSpinner2 className="animate-spin text-5xl text-mainRed" />
        </div>
        <div className="font-semibold text-lg">
          Please wait, the process continues
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
