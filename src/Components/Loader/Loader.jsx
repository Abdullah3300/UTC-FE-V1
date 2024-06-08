import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const Loader = () => {
  return (
    <div className="fixed z-10 bg-black bg-opacity-70 w-full h-[100dvh] top-0 left-0 flex justify-center items-center">
      <SyncLoader
        color={"#ffffff"}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
