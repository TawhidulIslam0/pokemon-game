# Who's That Pokémon? 🎮

A high-stakes "Pokédex Quest" game where you must guess the names of all 1025 Pokémon in a single session!

## The Challenge
The ultimate test of Pokémon knowledge. In this game, you must correctly identify all 1025 Pokémon without a single mistake.

* **Hardcore Mode**: One wrong guess or one expired timer means the game is over, and your progress resets to zero.
* **1025 Unique Encounters**: The game uses a randomized, non-repeating deck to ensure you face every single Pokémon exactly once per run.
* **Progress Tracking**: Watch your progress bar move from 0 to 1025. Can you make it to the end?

## Features
* **Three Difficulty Tiers**:
    * **Easy**: See the full, colorful Pokémon sprite immediately.
    * **Medium**: Test your skills with the classic "Who's That Pokémon?" silhouette effect.
    * **Hard**: The ultimate challenge! No image, no silhouette—just the Pokémon's unique cry to guide you.
* **Persistent Progress**: Your guesses are saved in your browser, allowing you to track your overall performance.

## Technologies Used
* **React**: Built with functional components and hooks for a reactive user experience.
* **PokeAPI**: Fetches high-quality sprites, names, and audio cries for all 1025 Pokémon.
* **Axios**: Efficiently handles API data fetching.

## How to Play
1.  **Select a Difficulty**: Choose your challenge level from the main menu.
2.  **Make Your Guess**: Type the name of the Pokémon in the input field.
3.  **Progress**: Correct guesses increment your progress.
4.  **Watch the Timer**: Every second counts. If the time runs out, the quest resets!

## Installation

To run this project locally:

```bash
# Clone the repository
git clone [YOUR_GITHUB_REPO_URL]

# Install dependencies
npm install

# Start the development server
npm start