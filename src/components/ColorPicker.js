import React, { useState } from "react";
import "./ColorPicker.css";

const ColorPicker = ({ currentColor, onChange }) => {
  const colors = ["red", "orange", "yellow", "green", "blue"];
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
