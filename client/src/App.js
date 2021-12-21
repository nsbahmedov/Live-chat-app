import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import io from "socket.io-client";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

// connect client-side to server-side
const socket = io.connect("http://localhost:3001");


function App() {

  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleJoinChat = (e) => {
    if (userName, roomId) {

      socket.emit("joinChat", roomId);

      setShowChat(true);

      alertify.success(`${userName} joined to ${roomId}`);
    }

    e.preventDefault();
  };

  return (
    <div className="App container d-flex align-items-center justify-content-center bg-light">
      <div style={{width:'500px'}}>
        
        {/* if joined to room display ChatWindow */}
        {!showChat ? (
          <form
            className="d-flex flex-column p-5 mb-5"
            onSubmit={handleJoinChat}
          >
            {/* --- HEADER ---  */}
            <h1 className='text-center mb-2'>&#x1F4AC; Live-Chat-App</h1>

            {/* --- USERNAME INPUT --- */}
            <div className="form-floating my-4">
              <input
                type="text"
                maxLength={16}
                className="form-control"
                id="floatingInput"
                placeholder="username"
                onChange={(e) => {
                  setUserName(e.target.value.trim());
                }}
              />
              <label htmlFor="floatingInput"> Username </label>
            </div>

            {/* --- ROOM_ID INPUT --- */}
            <div className="form-floating mb-4">
              <input
                type="text"
                maxLength={10}
                className="form-control"
                id="floatingPassword"
                placeholder="room id"
                onChange={(e) => {
                  setRoomId(e.target.value.trim());
                }}
              />
              <label htmlFor="floatingPassword"> Room ID </label>
            </div>

            {/* ACTION BUTTON */}
            <button
              type="submit"
              disabled={!userName || !roomId}
              className="btn btn-outline-success"
            >
              Join chat
            </button>
          </form>
        ) : (
          <ChatWindow socket={socket} userName={userName} roomId={roomId} />
        )}
      </div>
    </div>
  );
}

export default App;
