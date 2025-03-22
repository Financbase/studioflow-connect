
import React from "react";

const ProFeatures = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Pro Features</h3>
      <ul className="text-sm space-y-2">
        <li className="flex items-start gap-2">
          <svg className="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Save multiple layout configurations for different workflows</span>
        </li>
        <li className="flex items-start gap-2">
          <svg className="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Quick-switch between different studio layouts</span>
        </li>
        <li className="flex items-start gap-2">
          <svg className="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Create task-specific layouts (recording, mixing, mastering)</span>
        </li>
        <li className="flex items-start gap-2">
          <svg className="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Receive AI-powered layout recommendations</span>
        </li>
      </ul>
    </div>
  );
};

export default ProFeatures;
