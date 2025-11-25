'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ChatMessage from './ChatMessage';

export default function ChatBox() {
  const messages = useSelector((s: RootState) => s.chat.messages);
  return (
    <div className="h-[60vh] overflow-y-auto p-3  rounded-xl bg-[#f2f2f2]">
      <div className="flex flex-col gap-3">
        {messages.map((m: string, i: number) => (
          <ChatMessage key={i} text={m} />
        ))}
      </div>
    </div>
  );
}
