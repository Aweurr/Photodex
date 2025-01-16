import React, { useState, useEffect } from "react";
import PokemonTable from "./components/PokemonTable";
import FilterBar from "./components/FilterBar";
import { pokemonList } from "./data/pokemonData";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filter, setFilter] = useState("");

  // Charger les données depuis LocalStorage ou initialiser par défaut
  useEffect(() => {
    const savedData = localStorage.getItem("pokemons");
    console.log("Données récupérées de LocalStorage :", savedData);
  
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log("Données parsées :", parsedData);
      if (parsedData.length > 0) {
        setPokemons(parsedData);
      } else {
        console.log("Les données parsées sont vides, initialisation avec des données par défaut.");
        setPokemons(pokemonList);
        localStorage.setItem("pokemons", JSON.stringify(pokemonList));
      }
    } else {
      console.log("LocalStorage vide. Initialisation avec les données par défaut.");
      console.log("Données initiales (pokemonList):", pokemonList);
      setPokemons(pokemonList);
      localStorage.setItem("pokemons", JSON.stringify(pokemonList));
    }
  }, []);
  

  // Sauvegarder les données à chaque mise à jour
  useEffect(() => {
    {
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
    }
  }, [pokemons]);

  // Gérer le changement des scores
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

  // Gérer le filtre
  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  // Filtrer les Pokémon selon le parcours
  const filteredPokemons = pokemons.filter((pokemon) =>
    filter ? pokemon.paths.some((path) => path.includes(filter)) : true
  );

  const handleCommentChange = (pokemonId, commentType, newComment) => {
    const updatedPokemons = pokemons.map((pokemon) =>
      pokemon.id === pokemonId
        ? { ...pokemon, [commentType]: newComment }
        : pokemon
    );
    setPokemons(updatedPokemons);
  };
  

  return (
    <div className="app">
      <h1>Photodex - New Pokémon Snap</h1>
      <FilterBar filter={filter} onFilterChange={handleFilterChange} />
      <PokemonTable pokemons={filteredPokemons} onScoreChange={handleScoreChange} onCommentChange={handleCommentChange}/>
    </div>
  );
};

export default App;
