# ♟️ Chess Frontend

A real-time multiplayer chess application built with React that allows players to compete in live chess matches. The application features an interactive chessboard with real-time synchronization between players using WebSocket technology.

## ✨ Features

- 🎮 **Real-time Multiplayer** - Play chess with opponents in real-time
- 🔄 **Live Synchronization** - Moves are instantly synchronized between players
- 🎨 **Interactive Chessboard** - Drag-and-drop piece movement
- 🎲 **Room-based Gameplay** - Create or join game rooms
- ♟️ **Valid Move Detection** - Only legal chess moves are allowed
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚫⚪ **Two-player Support** - Automatic white/black assignment
- 🔔 **Game Over Detection** - Automatic winner detection

## 🚀 Tech Stack

- **Frontend Framework**: React 18
- **Chess Logic**: chess.js
- **Chessboard UI**: react-chessboard
- **Real-time Communication**: Socket.IO Client
- **Styling**: CSS
- **Build Tool**: Create React App
- **Deployment**: Firebase Hosting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/theQuarky/chess-frontend.git
   cd chess-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Create/Join a Room**
   - Enter a room name in the input field
   - Click the "Join" button
   - Share the room name with your opponent

2. **Wait for Opponent**
   - The first player will be assigned the white pieces
   - The second player to join will get the black pieces

3. **Play Chess**
   - Drag and drop pieces to make moves
   - Only valid moves according to chess rules are allowed
   - Wait for your turn to make a move

4. **Game Over**
   - The game automatically detects checkmate and stalemate
   - A winner will be announced when the game ends

## 📁 Project Structure

```
chess-frontend/
├── public/              # Static files
│   ├── index.html      # HTML template
│   └── ...
├── src/
│   ├── components/     # React components
│   ├── App.js          # Main application component
│   ├── App.css         # Application styles
│   ├── index.js        # Application entry point
│   └── ...
├── firebase.json       # Firebase hosting configuration
├── .firebaserc         # Firebase project configuration
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## 🔌 Backend Connection

This frontend connects to a backend server for real-time game synchronization:
- **Backend URL**: `https://chess-backend-ztdm.onrender.com`
- The backend handles room management and move synchronization
- Built with Socket.IO for WebSocket communication

**Note**: Ensure the backend server is running for the application to work properly.

## 📦 Available Scripts

### `npm start`
Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.  
The build is minified and optimized for best performance.

### `npm run eject`
**Note: This is a one-way operation. Once you eject, you can't go back!**

## 🚀 Deployment

This project is configured for deployment on Firebase Hosting.

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**theQuarky**
- GitHub: [@theQuarky](https://github.com/theQuarky)

## 🙏 Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Chess logic powered by [chess.js](https://github.com/jhlywa/chess.js)
- UI components from [react-chessboard](https://github.com/Clariity/react-chessboard)
- Real-time communication via [Socket.IO](https://socket.io/)

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ by theQuarky
