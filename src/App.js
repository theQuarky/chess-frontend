import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import * as ChessJS from "chess.js";
import "./App.css";

const socket = io("https://chess-backend-ztdm.onrender.com");
function App() {
  const userId = uuidv4();
  const [side, setSide] = useState("");
  const [roomName, setRoomName] = useState("");
  const [tempRoomName, setTempRoomName] = useState("");
  const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

  const chessInstance = new Chess();
  const [game, setGame] = useState(chessInstance);
  const [turn, setTurn] = useState(side === "White");
  const [msg, setMsg] = useState("");
  const [hasJoined, setHasJoined] = useState(false);

  // perform modify function on game state
  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });

    if (game.game_over()) {
      alert(`Game over ${game.turn() === "w" ? "Black" : "White"} wins`);
      setRoomName("");
    } else {
      console.log("Game not over");
    }
  }

  socket.on("receive-move", ({ roomName, userId, move, yourTurn }) => {
    safeGameMutate((game) => {
      game.move(move);
    });
    setTurn(yourTurn);
  });

  socket.on("user-joined", (data) => {
    setHasJoined(true);
    setMsg(data);
    setSide("white");
    setTurn(true);
  });

  function onDrop(sourceSquare, targetSquare) {
    if (turn) {
      let move = null;
      safeGameMutate((game) => {
        move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });
      });

      // illegal move made
      if (move === null) return false; // valid move made, make computer move
      console.log(game.toString());
      socket.emit("send-move", {
        roomName: tempRoomName,
        userId,
        move,
        turn,
        gameState: game.fen(),
      });
      setTurn((state) => !state);
      return true;
    }
  }

  useEffect(() => {
    if (msg !== "") setSide("white");
    else setSide("black");
  }, [msg]);

  if (roomName !== "")
    return (
      <>
        {/* <div>{msg === "" ? "No one has join your room yet!" : msg}</div> */}
        {hasJoined && (
          <>
            <Chessboard
              className="chess-board"
              position={game.fen()}
              onPieceDrop={onDrop}
              boardOrientation={side === "white" ? "white" : "black"}
            />
            <br />
            <div>{`Your team is ${side}`}</div>{" "}
          </>
        )}
      </>
    );

  return (
    <div className="join-room-container">
      <input
        type="text"
        value={tempRoomName}
        onChange={(e) => setTempRoomName(e.target.value)}
      />
      <button
        onClick={() => {
          setHasJoined(true);
          setRoomName(tempRoomName);
          socket.emit("join-room", { roomName: tempRoomName, userId });
        }}
      >
        Join
      </button>
    </div>
  );
}
export default App;
