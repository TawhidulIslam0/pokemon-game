import { useState } from 'react';

export default function GuessInput({ onGuess, allNames, disabled }) {
  const [input, setInput] = useState('');
  
  const suggestions = (input.length > 0 && !disabled) 
    ? allNames.filter(name => name.startsWith(input.toLowerCase())).slice(0, 5) 
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled || !input.trim()) return;
    onGuess(input);
    setInput('');
  };

  return (
    <div className="input-wrapper">
      <form onSubmit={handleSubmit}>
        <input 
          disabled={disabled}
          type="text"
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder={disabled ? "Game Over!" : "Who's that Pokémon?"} 
        />
        <button type="submit" disabled={disabled}>Guess!</button>
      </form>
      
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map(name => (
            <li key={name} onClick={() => { onGuess(name); setInput(''); }}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}