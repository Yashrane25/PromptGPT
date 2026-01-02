import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv4());
  const [previousChats, setPreviousChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        prompt,
        setPrompt,
        reply,
        setReply,
        currThreadId,
        setCurrThreadId,
        previousChats,
        setPreviousChats,
        newChat,
        setNewChat,
        allThreads,
        setAllThreads,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
