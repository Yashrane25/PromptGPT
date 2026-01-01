import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect, use } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    previousChats,
    setPreviousChats,
    setNewChat,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //Function to send the prompt to the backend and get the AIs reply
  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    console.log("Prompt sent:", prompt, "Thread ID:", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    //Make the API request to the backend
    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log("Response:", res);
      setReply(res.reply);
    } catch (err) {
      console.error("Error fetching reply:", err);
    }
    setLoading(false);
  };

  //Append new Chat to previous chats.
  useEffect(() => {
    if (prompt && reply) {
      setPreviousChats((previousChats) => [
        ...previousChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPrompt("");
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span className="name">
          PromptGPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">Sign up</div>
          <div className="dropDownItem">Login</div>
          <div className="dropDownItem">Logout</div>
        </div>
      )}

      <Chat></Chat>

      {/* <ScaleLoader color="#fff" loading={loading}></ScaleLoader> */}
      {loading && (
        <div className="loaderOverlay">
          <ScaleLoader color="#fff" />
        </div>
      )}

      <div className="chatInput">
        <div className="inputBox">
          <input
            className="input"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          PromptGPT can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
