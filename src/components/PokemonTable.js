import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import "./PokemonTable.css";

// Logos pour jour et nuit
const DayIcon = () => <span>☀️</span>;
const NightIcon = () => <span>🌙</span>;

// Couleurs pour les régions
const regionColors = {
  "Désert Sabrûlant": "#f4a261",
  "Terres Désolées": "#e76f51",
  "Parc Naturel d'Anthos": "#2a9d8f",
  "Chemin Caché": "#8ecae6",
  "Fleuve Rabord": "#219ebc",
  "Plage Pastel": "#ffafcc",
  "Jungle Grantarbre": "#4caf50",
  "Forêt Sibylline": "#6a994e",
  "Volcan Lavacoul": "#d1495b",
  "Plaine Frisquette": "#bde0fe",
  "Grotte Lointaine": "#9c6644",
  "Ruines du Protecteur": "#9370db",
};

const IconLink = ({ url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="icon-link">
    🔗
  </a>
);

const IconComment = ({ comment, onCommentChange }) => {
  const [editing, setEditing] = useState(false);
  const [tempComment, setTempComment] = useState(comment);

  const handleSave = () => {
    setEditing(false);
    onCommentChange(tempComment);
  };

  return (
    <div className="icon-comment">
      {editing ? (
        <div>
          <input
            type="text"
            value={tempComment}
            onChange={(e) => setTempComment(e.target.value)}
            className="comment-input"
          />
          <button onClick={handleSave} className="comment-save">
            ✅
          </button>
        </div>
      ) : (
        <span onClick={() => setEditing(true)} className="comment-icon">
          📝
        </span>
      )}
    </div>
  );
};

const PokemonTable = ({ pokemons, onScoreChange, onCommentChange}) => {
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
            <td>{pokemon.name}
            <IconComment
                  comment={pokemon.commentPoke}
                  onCommentChange={(newComment) =>
                    onCommentChange(pokemon.id, "commentPoke", newComment)
                  }
                />
            </td>
            {["photo1", "photo2", "photo3", "photo4"].map((photo) => (
              <td key={photo}>
                <ColorPicker
                  currentColor={pokemon.scores[photo]}
                  onChange={(color) => onScoreChange(pokemon.id, photo, color)}
                />
                <IconLink url={pokemon.link} />
                <IconComment
                    comment={pokemon.comment}
                    onCommentChange={(newComment) => 
                      onCommentChange(pokemon.id, newComment)
                    }
                  />
              </td>
              
            ))}
            <td>
              {pokemon.paths.map((path, index) => {
                const isDay = path.includes("jour");
                const isNight = path.includes("nuit");

                return (
                  <div
                    key={index}
                    className="path"
                    style={{
                      backgroundColor: Object.keys(regionColors).find((region) =>
                        path.includes(region)
                      )
                        ? regionColors[
                            Object.keys(regionColors).find((region) =>
                              path.includes(region)
                            )
                          ]
                        : "#ccc",
                    }}
                  >
                    {path} {isDay && <DayIcon />} {isNight && <NightIcon />}
                  </div>
                );
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PokemonTable;
