import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { ChatContext } from "./ChatContext.jsx";
import { v1 as uuidv1 } from "uuid";
import { authFetch } from "./auth.js";
import { MyContext } from "./MyContext.jsx";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPreviousChats,
  } = useContext(ChatContext);

  const { user } = useContext(MyContext);

  const getAllThreads = async () => {
    //Only fetch if user is logged in
    try {
      const response = await authFetch("http://localhost:8080/api/thread");
      if (!response.ok) return; //stop if unauthorized

      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPreviousChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await authFetch(
        `http://localhost:8080/api/thread/${newThreadId}`
      );
      if (!response.ok) return;
      const res = await response.json();
      setPreviousChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await authFetch(
        `http://localhost:8080/api/thread/${threadId}`,
        { method: "DELETE" }
      );
      if (!response.ok) return;
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );
      if (threadId === currThreadId) createNewChat();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="sidebar">
      <div className="top-row">
        <button className="logo-btn" onClick={createNewChat}>
          <img src="src/assets/Logo.jpg" alt="PromptGPT" className="logo" />
        </button>

        <button className="icon-btn" onClick={createNewChat}>
          <span className="new-chat">New chat</span>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>

      <ul className="history">
        <span>
          <p className="history-head">
            {user
              ? "Your history"
              : "Sign up or log in to start saving your chat history."}
          </p>
        </span>
        {allThreads?.map((thread, idx) => (
          <li
            key={idx}
            onClick={() => changeThread(thread.threadId)}
            className={`history-item ${
              thread.threadId === currThreadId ? "highlighted" : ""
            }`}
          >
            {thread.title}
            <i
              className="fa-solid fa-trash-can delete-icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="developer">
        <p>
          By{" "}
          <a
            href="https://www.linkedin.com/in/yashrane25/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-icon"
          >
            Yash R. Rane <i className="fa-brands fa-linkedin"></i>
          </a>
        </p>
      </div>
    </section>
  );
}

export default Sidebar;
