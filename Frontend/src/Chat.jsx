// import "./Chat.css";
// import { useContext } from "react";
// import { MyContext } from "./MyContext.jsx";

// function Chat() {
//   const { newChat, previousChats } = useContext(MyContext);
//   return (
//     <>
//       {newChat && <h1>Start a new chat!</h1>}

//       <div className="chat">
//         {previousChats?.map((chat, idx) => (
//           <div
//             className={chat.role === "user" ? "userDiv" : "gptDiv"}
//             key={idx}
//           >
//             {chat.role === "user" ? (
//               <p className="userMessage">{chat.content}</p>
//             ) : (
//               <p className="gptMessage">{chat.content}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Chat;

import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import RehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github.css";   //Light theme code colour
import "highlight.js/styles/github-dark.css"; //Dark theme colour

function Chat() {
  const { newChat, previousChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  // useEffect(() => {
  //   //latestReply saperate => typing effect.
  //   if (!previousChats?.length) return;

  //   const content = reply.split(" "); //individual words

  //   let idx = 0;
  //   const interval = setInterval(() => {
  //     setLatestReply(content.slice(0, idx + 1).join(" "));

  //     idx++;
  //     if (idx >= content.length) clearInterval(interval);
  //   }, 40);

  //   return () => clearInterval(interval);
  // }, [previousChats, reply]);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }

    if (!previousChats?.length) return;

    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(reply.slice(0, idx + 1)); // character by character
      idx++;
      if (idx >= reply.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [previousChats, reply]);

  return (
    <>
      {/* {newChat && <h1 className="newChatTitle">Start a new chat!</h1>} */}
      {newChat && (
        <div className="newChatWrapper">
          <h1 className="newChatTitle">Start a new chat!</h1>
        </div>
      )}

      <div className="chat">
        {previousChats?.slice(0, -1).map((chat, idx) => (
          <div
            key={idx}
            className={`messageRow ${chat.role === "user" ? "right" : "left"}`}
          >
            <div
              className={chat.role === "user" ? "userMessage" : "gptMessage"}
              key={idx}
            >
              {chat.role === "assistant" ? (
                <ReactMarkdown rehypePlugins={[RehypeHighlight]}>
                  {chat.content}
                </ReactMarkdown>
              ) : (
                chat.content
              )}
            </div>
          </div>
        ))}

        {/* if null print previous chat or print latest chats */}
        {previousChats.length > 0 && (
          <>
            {latestReply === null ? (
              <div className="left" key={"non-typing"}>
                <ReactMarkdown rehypePlugins={[RehypeHighlight]}>
                  {previousChats[previousChats.length - 1].content}
                </ReactMarkdown>{" "}
              </div>
            ) : (
              <div className="left" key={"typing"}>
                <ReactMarkdown rehypePlugins={[RehypeHighlight]}>
                  {latestReply}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Chat;
