import React, { useState } from "react";
import "./ColorPicker.css";

const ColorPicker = ({ currentColor, onChange }) => {
  const colors = ["red", "orange", "yellow", "green", "blue"];
  const [isOpen, setIsOpen] = useState(false);

  const handleColorSelect = (color) => {
    onChange(color);
    setIsOpen(false); // Fermer la liste après le choix
  };

  return (
    <div className="color-picker">
      {/* Rectangle de la couleur actuelle */}
      <div
        className="color-display"
        style={{ backgroundColor: currentColor }}
        onClick={() => setIsOpen(!isOpen)} // Ouvrir/fermer la liste
      ></div>

      {/* Liste des couleurs */}
      {isOpen && (
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)} // Choisir une couleur
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
