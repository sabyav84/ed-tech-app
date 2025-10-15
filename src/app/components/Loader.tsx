import React from "react";
// <div className="flex justify-center items-center w-screen h-screen">
//   <div className="h-40 w-40 border-4 border-purple-700 border-t-transparent rounded-full animate-spin" />
// </div>

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="mt-12 flex justify-center space-x-2">
        <div
          className="w-12 h-12 bg-indigo-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-12 h-12 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-12 h-12 bg-pink-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );
}
