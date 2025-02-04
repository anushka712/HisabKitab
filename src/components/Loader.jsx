import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50 pointer-events-none">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-green-600 border-solid"></div>
      <span className="ml-4 text-xl text-green-600 font-semibold">
        Loading...
      </span>
    </div>
  );
}

export default Loader;
