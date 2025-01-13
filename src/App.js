import React, { useState, useEffect } from "react";
import ColorPicker from "./components/ColorPicker";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);

  // Charger les données depuis LocalStorage au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem("pokemons");
    if (savedData) {
      // Charger les données sauvegardées
      setPokemons(JSON.parse(savedData));
    } else {
      // Initialiser avec des données par défaut
      const defaultData = [
        {
          id: 1,
          name: "Pikachu",
          scores: { photo1: "red", photo2: "orange", photo3: "yellow", photo4: "green" },
        },
        {
          id: 2,
          name: "Charmander",
          scores: { photo1: "blue", photo2: "green", photo3: "yellow", photo4: "red" },
        },
      ];
      setPokemons(defaultData);
  
      // Sauvegarder les données par défaut dans LocalStorage
      localStorage.setItem("pokemons", JSON.stringify(defaultData));
    }
  }, []);
  
  useEffect(() => {
    if (pokemons.length > 0) {
      localStorage.setItem("pokemons", JSON.stringify(pokemons));
    }
  }, [pokemons]);


  // Gérer les changements de couleur
  const handleScoreChange = (pokemonId, photo, color) => {
    const updatedPokemons = pokemons.map((pokemon) => {
      if (pokemon.id === pokemonId) {
        return {
          ...pokemon,
          scores: { ...pokemon.scores, [photo]: color },
        };
      }
      return pokemon;
    });

    setPokemons(updatedPokemons);
  };

  return (
    <div className="app">
      <h1>Photodex - New Pokémon Snap</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Photo 1</th>
            <th>Photo 2*</th>
            <th>Photo 3*</th>
            <th>Photo 4*</th>
          </tr>
        </thead>
        <tbody>
  {pokemons.length > 0 ? (
    pokemons.map((pokemon) => (
      <tr key={pokemon.id}>
        <td>{pokemon.name}</td>
        {["photo1", "photo2", "photo3", "photo4"].map((photo) => (
          <td key={photo}>
            <ColorPicker
              currentColor={pokemon.scores[photo]}
              onChange={(color) => handleScoreChange(pokemon.id, photo, color)}
            />
          </td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">Aucun Pokémon trouvé</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default App;
