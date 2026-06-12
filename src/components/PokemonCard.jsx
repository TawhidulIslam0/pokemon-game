import { useState } from 'react';

export default function PokemonCard({ pokemon, isRevealed, difficulty }) {
  if (!pokemon) return <div className="pokemon-card">Loading Pokémon...</div>;

  const [isLoaded, setIsLoaded] = useState(false);
  
  const showFullSprite = isRevealed || difficulty === 'easy';
  const showSilhouette = difficulty === 'medium' && !isRevealed;
  const showHidden = difficulty === 'hard' && !isRevealed;

  return (
    <div className="pokemon-card">
      {showHidden ? (
        <div className="pokemon-placeholder">???</div>
      ) : (
        <img 
          key={pokemon.id} 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt="pokemon" 
          className="pokemon-image"
          onLoad={() => setIsLoaded(true)}
          style={{ 
            opacity: isLoaded ? 1 : 0,
            // Filter: brightness(0) makes it a silhouette
            filter: showSilhouette ? 'brightness(0)' : 'none',
            transition: 'opacity 0.5s ease, filter 0.5s ease',
            pointerEvents: 'none',
            WebkitUserDrag: 'none'
          }} 
        />
      )}
    </div>
  );
}