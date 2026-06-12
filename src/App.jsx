import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import PokemonCard from './components/PokemonCard';
import GuessInput from './components/GuessInput';
import Scoreboard from './components/Scoreboard';

const DIFFICULTY_CONFIG = {
  easy: { time: 60, label: 'Easy' },
  medium: { time: 30, label: 'Medium' },
  hard: { time: 15, label: 'Hard' }
};

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(0);
  const [deck, setDeck] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  const playCry = useCallback((pokeData) => {
    if (pokeData?.cries?.latest) {
      new Audio(pokeData.cries.latest).play();
    }
  }, []);

  const fetchPokemon = async (selectedDifficulty, currentDeck) => {
    setIsRevealed(false);
    setIsGameOver(false);
    setTimeLeft(DIFFICULTY_CONFIG[selectedDifficulty].time);
    
    const nextDeck = [...currentDeck];
    const id = nextDeck.pop();
    setDeck(nextDeck);
    
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon(res.data);

    if (selectedDifficulty === 'hard') {
      setTimeout(() => playCry(res.data), 500);
    }
  };

  const startGame = (mode) => {
    setDifficulty(mode);
    setScore(0);
    setIsWon(false);
    const allIds = Array.from({ length: 1025 }, (_, i) => i + 1);
    const shuffled = shuffleArray(allIds);
    setDeck(shuffled);
    fetchPokemon(mode, shuffled);
  };

  useEffect(() => {
    if (!difficulty || isRevealed || isGameOver || isWon) return; 
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setIsGameOver(true);
      setIsRevealed(true);
      playCry(pokemon);
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isRevealed, isGameOver, isWon, difficulty, pokemon, playCry]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1025")
      .then(res => setAllNames(res.data.results.map(p => p.name)));
  }, []);

  const handleGuess = (guess) => {
    if (isGameOver || isWon) return;
    if (guess.toLowerCase().trim() === pokemon.name.toLowerCase()) {
      setIsRevealed(true);
      playCry(pokemon);
      
      const collected = JSON.parse(localStorage.getItem('myPokedex') || '[]');
      if (!collected.includes(pokemon.id)) {
        collected.push(pokemon.id);
        localStorage.setItem('myPokedex', JSON.stringify(collected));
      }
      
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore === 1025) {
        setIsWon(true);
      } else {
        setTimeout(() => fetchPokemon(difficulty, deck), 2000);
      }
    }
  };

  return (
    <div className="game-container">
      {isWon ? (
        <div className="victory-screen">
          <h1>Victory!</h1>
          <h2>You are officially a Pokémon Master!</h2>
          <p>You have successfully identified all 1025 Pokémon.</p>
          <button onClick={() => window.location.reload()} className="try-again-btn">
            Play Again
          </button>
        </div>
      ) : !difficulty ? (
        <div className="menu">
          <h1>Who's That Pokémon?</h1>
          <div className="difficulty-buttons">
            <button onClick={() => startGame('easy')}>Easy</button>
            <button onClick={() => startGame('medium')}>Medium</button>
            <button onClick={() => startGame('hard')}>Hard</button>
          </div>
        </div>
      ) : (
        <>
          <div className="top-bar">
            <Scoreboard score={score} />
          </div>
          
          <h1>{isGameOver ? `It was ${pokemon.name.toUpperCase()}! Game Over.` : "Who's That Pokémon?"}</h1>
          
          <PokemonCard 
            pokemon={pokemon} 
            isRevealed={isRevealed} 
            difficulty={difficulty}
          />

          {difficulty === 'hard' && !isGameOver && (
             <button onClick={() => playCry(pokemon)} className="cry-btn" style={{marginBottom: '10px'}}>
               🔊 Replay Cry
             </button>
          )}

          {isGameOver ? (
            <button onClick={() => setDifficulty(null)} className="try-again-btn">
              Back to Menu
            </button>
          ) : (
            <>
              <div className={`timer ${timeLeft <= 3 ? 'low-time' : ''}`}>Time Left: {timeLeft}s</div>
              <GuessInput onGuess={handleGuess} allNames={allNames} disabled={isGameOver} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;