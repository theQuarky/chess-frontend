import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import * as ChessJS from "chess.js";
import "./App.css";

const socket = io("https://good-plum-moth-suit.cyclic.app");
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

  // perform modify function on game state
  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  socket.on("receive-move", ({ roomName, userId, move, yourTurn }) => {
    safeGameMutate((game) => {
      game.move(move);
    });
    setTurn(yourTurn);
  });

  socket.on("user-joined", (data) => {
    setMsg(data);
    setSide("Black");
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
      socket.emit("send-move", {
        roomName: tempRoomName,
        userId,
        move,
        turn,
      });
      setTurn((state) => !state);
      return true;
    }
  }

  useEffect(() => {
    if (msg !== "") setSide("White");
  }, [msg]);

  if (roomName !== "")
    return (
      <>
        <div>{msg}</div>
        <Chessboard
          className="chess-board"
          position={game.fen()}
          onPieceDrop={onDrop}
        />
        <br />
        <div>{`Your team is ${side}`}</div>
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
