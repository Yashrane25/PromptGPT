import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { ChatContext } from "./ChatContext.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { authFetch, logout } from "./auth.js";
import { useNavigate } from "react-router-dom";

function ChatWindow() {
  const { user, setUser } = useContext(MyContext);
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    previousChats,
    setPreviousChats,
    setNewChat,
  } = useContext(ChatContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Send prompt to backend
  const getReply = async () => {
    if (!user) return; // not logged in, skip

    setLoading(true);
    setNewChat(false);

    try {
      const response = await authFetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, threadId: currThreadId }),
      });
      if (!response.ok) return;
      const res = await response.json();
      setReply(res.reply);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // Append new chat
  useEffect(() => {
    if (prompt && reply) {
      setPreviousChats((prev) => [
        ...prev,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }
    setPrompt("");
  }, [reply]);

  const handleProfileClick = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsOpen(false);
    navigate("/chat");
    window.location.reload();
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span className="name">PromptGPT</span>

        <div className="userIconDiv" onClick={handleProfileClick}>
          {user &&
            user.username && ( //check if user is logged in
              <span className="username">{user.username}</span>
            )}
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          {!user && (
            <>
              <button
                className="dropDownItem"
                onClick={() => {
                  navigate("/register");
                  setIsOpen(false);
                }}
              >
                Sign Up
              </button>
              <button
                className="dropDownItem"
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
              >
                Login
              </button>
            </>
          )}

          {user && (
            <button className="dropDownItem" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      )}

      <Chat />

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
            onKeyDown={(e) => e.key === "Enter" && getReply()}
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
