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
    // Fix numbered lists like: "1.\n\nText" → "1. Text"
    return text.replace(/(\d+)\.\s*\n+/g, "$1. ");
  }

  return (
    <>
      {/* New chat welcome */}
      {newChat && (
        <div className="newChatWrapper">
          {/* <h1 className="newChatTitle">Start a new chat!</h1> */}
          {user ? (
            <h1 className="newChatTitle">Start a new chat!</h1>
          ) : (
            <div>
              <h1 className="newChatTitle">
                You must have an account to use PromptGPT Please log in or
                register.
              </h1>
              <p className="newChatSubtitle">
                Log in or register through the user icon above to access
                PromptGPT’s chat features.
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
