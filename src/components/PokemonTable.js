import React from "react";
import ColorPicker from "./ColorPicker";
import "./PokemonTable.css";

const PokemonTable = ({ pokemons, onScoreChange }) => {
  return (
    <table className="pokemon-table">
      <thead>
        <tr>
          <th>Photo</th>
          <th>Nom</th>
          <th>Photo 1*</th>
          <th>Photo 2*</th>
          <th>Photo 3*</th>
          <th>Photo 4*</th>
          <th>Parcours</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map((pokemon) => (
          <tr key={pokemon.id}>
<td>
  <img
    src={pokemon.image}
    alt={pokemon.name}
    className="pokemon-image"
  />
</td>
            <td>{pokemon.name}</td>
            {["photo1", "photo2", "photo3", "photo4"].map((photo) => (
              <td key={photo}>
                <ColorPicker
                  currentColor={pokemon.scores[photo]}
                  onChange={(color) => onScoreChange(pokemon.id, photo, color)}
                />
              </td>
            ))}
            <td>
              {pokemon.paths.map((path, index) => (
                <div key={index} className="path">
                  {path}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PokemonTable;
