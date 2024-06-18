import {useState} from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

// add here backend url
const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleJoinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="John......"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="John......"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={() => handleJoinRoom()}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
