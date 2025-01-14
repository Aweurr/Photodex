import React, { useState } from "react";
import "./ColorPicker.css";

const ColorPicker = ({ currentColor, onChange }) => {
  const colors = ["#FFB3C1", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#A0C4FF"]; // Tons pastel
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="color-picker">
      <div
        className="color-display"
        style={{ backgroundColor: currentColor }}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      {isOpen && (
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => {
                onChange(color);
                setIsOpen(false);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
