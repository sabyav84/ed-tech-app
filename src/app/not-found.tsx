import React from "react";
import { Home, AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="bg-purple-100 p-6 rounded-full">
            <AlertCircle className="w-16 h-16 text-indigo-600" />
          </div>
        </div>
        <h2 className="text-8xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          404
        </h2>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Whoops!</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist...
        </p>
        <a
          href="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </a>
      </div>
    </div>
  );
}
