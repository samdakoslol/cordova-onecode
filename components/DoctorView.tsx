import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Stethoscope, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { mockAskDoctor } from '../services/mockApi';

export const DoctorView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'doctor',
      text: 'أهلاً بك! أنا طبيب النباتات. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await mockAskDoctor(userMsg.text);
      const doctorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        text: response.answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, doctorMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-green-600 p-4 text-white flex items-center gap-3 shadow-sm">
        <div className="bg-white/20 p-2 rounded-full">
          <Stethoscope className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold">استشارة الطبيب</h2>
          <p className="text-green-100 text-xs">متصل الآن</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className={`text-[10px] mt-1 block ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-end">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};