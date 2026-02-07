'use client';

import { useMemo, useState } from 'react';

import { chatbotQuickActions, getChatbotResponse } from '../lib/mock-chatbot';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const typingDots = ['0', '150', '300'];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hi! I’m your St Kitts travel helper. Ask me anything or tap a quick action below.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: text.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = getChatbotResponse(text);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          content: response,
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const quickActions = useMemo(() => chatbotQuickActions, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Ask the St Kitts AI Helper</p>
              <p className="text-xs text-slate-300">Mock responses • Phase 3</p>
            </div>
            <button
              className="text-xs font-semibold text-slate-300 hover:text-white"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Close
            </button>
          </div>

          <div className="flex max-h-[360px] flex-col gap-4 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  {typingDots.map((delay) => (
                    <span
                      key={delay}
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
                AI is typing...
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex flex-wrap gap-2 pb-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:border-primary hover:text-primary"
                  onClick={() => handleSend(action.prompt)}
                  type="button"
                >
                  {action.label}
                </button>
              ))}
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                handleSend(input);
              }}
            >
              <input
                className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about visas, beaches, food..."
                type="text"
                value={input}
              />
              <button
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {isOpen ? 'Hide Chat' : 'Chat with AI'}
        <span aria-hidden="true">💬</span>
      </button>
    </div>
  );
}
