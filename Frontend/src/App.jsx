import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  //State variables to manage global app state
  const [prompt, setPrompt] = useState(""); //to store users prompt
  const [reply, setReply] = useState(null); //to store the AIs reply
  const [currThreadId, setCurrThreadId] = useState(uuidv4()); //generate a unique thread ID for the current chat session
  const [previousChats, setPreviousChats] = useState([]); //to store previous chats
  const [newChat, setNewChat] = useState(true); //to manage new chat sessions
  const [allThreads, setAllThreads] = useState([]); //to store all previous threads(chats).

  //Values to be provided through context
  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    previousChats,
    setPreviousChats,
    allThreads,
    setAllThreads,
  };

  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  );
}

export default App;
