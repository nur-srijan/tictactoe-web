# README.md

# Tic Tac Toe Project

This project is a web-based implementation of the classic Tic Tac Toe game, featuring 3x3, 4x4, and 5x5 versions. The game includes an intelligent AI opponent using the minimax algorithm with alpha-beta pruning.

## Project Structure

- `src/index.html`: Main landing page with game selection and features overview
- `src/tictactoe_3x3.html`: Classic 3x3 Tic Tac Toe game
- `src/tictactoe_4x4.html`: Advanced 4x4 version
- `src/tictactoe_5x5.html`: Expert 5x5 version
- `src/js/`
  - `tictac_3x3.js`: Game logic for 3x3 board
  - `tictac_4x4.js`: Game logic for 4x4 board
  - `tictac_5x5.js`: Game logic for 5x5 board
- `src/css/`
  - `styles3x3.css`: Styles for 3x3 game
  - `styles4x4.css`: Styles for 4x4 game
  - `styles5x5.css`: Styles for 5x5 game

## Features

- Three different board sizes:
  - 3x3: Classic game with traditional rules
  - 4x4: Advanced version requiring 4 in a row
  - 5x5: Expert mode with enhanced winning conditions
- Intelligent AI opponent using minimax algorithm
- Responsive design for all screen sizes
- Modern user interface with animations
- Game state tracking
- Real-time win detection
- Easy reset functionality
- Light and Dark modes synchronysied with your system theme **New**

## How to Play

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tic-tac-toe.git
```

2. Navigate to the project directory:
```bash
cd tic-tac-toe
```

3. Open `src/index.html` in your web browser or use a local server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000/src/index.html`

## Game Rules

### 3x3 Version
- Classic rules: get three in a row to win
- First player is X, AI is O

### 4x4 Version
- Get four in a row to win
- Increased complexity with larger board

### 5x5 Version
- Get four in a row to win
- Strategic gameplay with more winning possibilities

## Technical Details

- Pure JavaScript implementation
- Minimax algorithm with alpha-beta pruning for AI
- Responsive CSS Grid layout
- Modern ES6+ features
- No external dependencies

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font: Cooper Black and Press Start 2P from Google Fonts
- Inspiration: Classic Tic Tac Toe game
- AI Implementation: Minimax algorithm with alpha-beta pruning