import React from "react";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="h-8 w-8 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
        role="status"
      />
    </div>
  );
};
