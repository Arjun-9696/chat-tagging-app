import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#f1f1f1]">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-5">
        <div className="md:flex justify-between flex-col">
          <h1 className="text-xl font-semibold mb-0.5">Datastride Analytics</h1>
          <h3 className="text-lg mb-4">
            Chat App with WhatsApp-Style Tagging & Dynamic Autocomplete
          </h3>
        </div>
        <ChatWindow />
      </div>
    </main>
  );
}
