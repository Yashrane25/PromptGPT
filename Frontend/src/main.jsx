import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MyProvider } from "./MyContext.jsx";
import { ChatProvider } from "./ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MyProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </MyProvider>
  </BrowserRouter>
);
