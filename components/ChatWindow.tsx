'use client';
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
export default function ChatWindow() {
  return (
    <div className="flex flex-col gap-4">
      <ChatBox />
      <ChatInput />
    </div>
  );
}
