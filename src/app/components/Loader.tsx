import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="h-40 w-40 border-4 border-purple-700 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
