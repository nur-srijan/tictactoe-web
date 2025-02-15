# Tic Tac Toe Project

This project is a web-based implementation of the classic Tic Tac Toe game, featuring 3x3, 4x4, and 5x5 versions. The game includes an intelligent AI opponent using the minimax algorithm with alpha-beta pruning.

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

3. Open `index.html` in your web browser or use a local server:
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
