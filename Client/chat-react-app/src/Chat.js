import React, {useEffect, useState} from "react";

function Chat({socket, userName, room}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);

  const handleSendMessage = async () => {
    if (currentMessage !== "") {
      console.log("breal");
      const messageData = {
        room: room,
        userName: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ";" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setListMessage((list)=>[...list,messageData])
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data, "data");
      setListMessage((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {listMessage.map((e) => {
          return (
            <div className="message">
              <div>
                <div className="message-content">
                  <p>{e.message}</p>
                </div>
                <div className="message-meta">
                  <p>{e.time}</p>
                  <p>{e.userName}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="hey.."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button
          onClick={() => {
            handleSendMessage();
          }}
        >
         send
        </button>
      </div>
    </div>
  );
}

export default Chat;
