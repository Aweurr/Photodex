const fs = require('fs'); // Module pour lire/écrire les fichiers
const path = require('path'); // Module pour gérer les chemins de fichiers

// Charger le fichier pokemonData.js
const pokemonDataPath = path.join(__dirname, 'pokemonData.js'); 
const { pokemonList } = require('./pokemonData'); // Import des Pokémon

// Génération des liens
const generateLinks = (pokemons) => {
    let baseIds = {
        link1: [464550, 472761],
        link2: [464764, 472781],
        link3: [464978, 472801],
        link4: [465192, 472821]
    };

    pokemons.forEach((pokemon, index) => {
        let group = index < 214 ? 0 : 1;
        let offset = index % 214;

        pokemon.link1 = `https://cyberscore.me.uk/charts/${baseIds.link1[group] + offset}`;
        pokemon.link2 = `https://cyberscore.me.uk/charts/${baseIds.link2[group] + offset}`;
        pokemon.link3 = `https://cyberscore.me.uk/charts/${baseIds.link3[group] + offset}`;
        pokemon.link4 = `https://cyberscore.me.uk/charts/${baseIds.link4[group] + offset}`;
    });
};

// Mise à jour des images
const updateImagePaths = (pokemons) => {
    pokemons.forEach((pokemon) => {
        if (!pokemon.image.startsWith("/")) {
            pokemon.image = "/" + pokemon.image;
        }
    });
};

// Appliquer les mises à jour
generateLinks(pokemonList);
updateImagePaths(pokemonList);

// Générer le nouveau contenu du fichier
const newContent = `export const pokemonList = ${JSON.stringify(pokemonList, null, 2)};`;

// Écrire les nouvelles données dans pokemonData.js
fs.writeFileSync(pokemonDataPath, newContent, 'utf-8');

console.log("✅ Mise à jour des Pokémon terminée !");
