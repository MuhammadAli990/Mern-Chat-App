import { Bot } from "lucide-react";
import React from "react";

function NoChatSelected() {
  return (
    <div className="w-full flex justify-center items-center flex-col h-screen text-center px-4">
      <Bot className="text-primary sm:w-20 mb-1 sm:h-20 h-12 w-12 animate-bounce bg-green-950 rounded-xl p-2" />
      <h2 className="text-3xl mb-2 font-bold">Welcome to Chatify!</h2>
      <p>Select a conversation from sidebar to start chatting.</p>
    </div>
  );
}

export default NoChatSelected;
