import React, { useState, useEffect, useRef } from "react";
import "./ColorPicker.css";

const ColorPicker = ({ currentColor, onChange }) => {
  const colors = ["#FFB3C1", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#A0C4FF"]; // Tons pastel
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null); // Référence sur le composant

  // Fermer le colorpicker si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={pickerRef} className="color-picker">
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
