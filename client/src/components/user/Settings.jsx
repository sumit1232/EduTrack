import React from "react";
import { Settings as SettingsIcon, Wrench, Clock } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-md">
        
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-indigo-100 rounded-full">
            <SettingsIcon size={32} className="text-indigo-600 animate-spin" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Settings
        </h1>

        <div className="mt-3 flex items-center justify-center gap-2 text-gray-500">
          <Wrench size={18} />
          <span>Page under development</span>
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-gray-400 text-sm">
          <Clock size={16} />
          <span>We’re working on improving this section</span>
        </div>

        <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-indigo-600 h-2 rounded-full w-1/3"></div>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Coming soon with full customization options
        </p>
      </div>
    </div>
  );
};

export default Settings;