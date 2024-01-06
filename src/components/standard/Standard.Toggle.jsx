import React, { useState } from "react";

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div className="flex items-center justify-center">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            onChange={toggleSwitch}
            checked={isOn}
          />
          <div
            className={`block bg-gray-600 w-10 h-6 rounded-full ${
              isOn ? "bg-green-500" : ""
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
              isOn ? "transform translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
