import React from "react";
import "./FilterBar.css";

const FilterBar = ({ filter, onFilterChange }) => {
  const regions = [
    "Désert Sabrûlant",
    "Terres Désolées",
    "Parc Naturel d'Anthos",
    "Chemin Caché",
    "Fleuve Rabord",
    "Plage Pastel",
    "Jungle Grantarbre",
    "Forêt Sibylline",
    "Volcan Lavacoul",
    "Plaine Frisquette",
    "Grotte Lointaine",
    "Ruines du Protecteur",
  ];

  return (
    <div className="filter-bar">
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-select"
      >
        <option value="">Toutes les régions</option>
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
