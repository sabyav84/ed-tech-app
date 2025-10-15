"use client";

import { useState, useCallback } from "react";

type ErrorToast = {
  id: string;
  message: string;
};

export default function ErrorToaster() {
  const [errors, setErrors] = useState<ErrorToast[]>([]);

  const showError = useCallback((message: string) => {
    const id = Date.now().toString();
    const toast = { id, message };
    setErrors((prev) => [...prev, toast]);

    setTimeout(() => {
      setErrors((prev) => prev.filter((e) => e.id !== id));
    }, 3000);
  }, []);

  (window as any).showError = showError;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {errors.map((err) => (
        <div
          key={err.id}
          className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg shadow-sm animate-fade-in"
        >
          {err.message}
        </div>
      ))}
    </div>
  );
}
