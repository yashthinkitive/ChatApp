import React from "react";
import { ChatEngine } from "react-chat-engine";
import ChatFeed, { ChatFeedProps } from "./components/ChatFeed";
import "./App.css";
import LoginForm from "./components/LoginForm";

const App: React.FC = () => {
  if (!localStorage.getItem("chatengineusername")) return <LoginForm />;
  
  return (
    <ChatEngine
      height="100vh"
      projectID="c5b0d7f7-4eeb-42d6-87e0-0b6d5380d422"
      userName={localStorage.getItem("chatengineusername") || ""}
      userSecret={localStorage.getItem("chatenginepassword") || ""}
      renderChatFeed={(chatAppProps: ChatFeedProps) => <ChatFeed {...chatAppProps} />}
    />
  );
};

export default App;
