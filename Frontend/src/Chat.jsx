import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "./ChatContext.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { MyContext } from "./MyContext.jsx";

function Chat() {
  const { newChat, previousChats, reply } = useContext(ChatContext);
  const [latestReply, setLatestReply] = useState("");

  const { user } = useContext(MyContext);

  // Typing animation for assistant reply
  useEffect(() => {
    if (!reply) {
      setLatestReply("");
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setLatestReply(reply.slice(0, index + 1));
      index++;
      if (index >= reply.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [reply]);

  function normalizeMarkdown(text = "") {
    //Fix numbered lists like: "1.\n\nText" → "1. Text"
    return text.replace(/(\d+)\.\s*\n+/g, "$1. ");
  }

  return (
    <>
      {/* New chat welcome */}
      {newChat && (
        <div className="newChatWrapper">
          {/* <h1 className="newChatTitle">Start a new chat!</h1> */}
          {user ? (
            <div className="welcomeBox">
              <h1 className="newChatTitle2 typing">
                Welcome to PromptGPT,{" "}
                <span className="usernameGradient">{user.username}</span>
              </h1>
              <p className="newChatSubTitle2 typing">
                {" "}
                Start a new conversation to begin
              </p>
            </div>
          ) : (
            <div>
              <h1 className="newChatTitle1">
                {"You must have an account to use PromptGPT. Please log in or register."
                  .split("")
                  .map((char, i) => (
                    <span key={i} className="letter1">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
              </h1>

              <p className="newChatSubtitle1">
                {"Log in or register through the user icon above to access PromptGPT's chat features."
                  .split("")
                  .map((char, i) => (
                    <span key={i} className="letter2">
                      {char === " " ? "\u00A0" : char} {/* preserve spaces */}
                    </span>
                  ))}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="chat">
        {/* Previous messages except latest assistant reply */}
        {previousChats.slice(0, -1).map((chat, idx) => (
          <div
            key={idx}
            className={`messageRow ${chat.role === "user" ? "right" : "left"}`}
          >
            <div
              className={chat.role === "user" ? "userMessage" : "gptMessage"}
            >
              {chat.role === "assistant" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {chat.content}
                </ReactMarkdown>
              ) : (
                chat.content
              )}
            </div>
          </div>
        ))}

        {/* Latest assistant reply with typing animation */}
        {previousChats.length > 0 && (
          <div className="messageRow left">
            <div className="gptMessage">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {normalizeMarkdown(
                  latestReply || previousChats[previousChats.length - 1].content
                )}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
