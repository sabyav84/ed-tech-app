import React from "react";

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
