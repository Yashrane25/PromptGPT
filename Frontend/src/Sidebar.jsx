import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

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
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      // console.log(filteredData);
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
      const response = await fetch(
        `http://localhost:8080/api/thread/${newThreadId}`
      );
      const res = await response.json();
      console.log(res);
      setPreviousChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  //To delete thread
  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
        { method: "DELETE" }
      );
      const res = await response.json();
      console.log(res);

      //updated thread re-render.
      setAllThreads((previous) =>
        previous.filter((thread) => thread.threadId != threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="sidebar">
      {/* TOP SECTION (Logo + Button next to each other) */}
      <div className="top-row">
        <button className="logo-btn" onClick={createNewChat}>
          <img src="src/assets/Logo.jpg" alt="PromptGPT" className="logo" />
        </button>

        <button className="icon-btn" onClick={createNewChat}>
          <span className="new-chat">New chat</span>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>

      {/* History */}

      <ul className="history">
        <span>
          <p className="history-head">Your history</p>
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

      {/* Sign in */}
      <div className="sign">
        <p>By Yash R. Rane</p>
      </div>
    </section>
  );
}

export default Sidebar;
