import React, { useState, useRef, useEffect } from 'react';
import { User, Message } from './types';
import { AttachFile, Send, Link as LinkIcon } from '@mui/icons-material'; // Material UI icons
import { formatDistanceToNow } from 'date-fns';
import { clsx } from 'clsx';

interface ChatWindowProps {
  currentUser: User;
  selectedUser: User | null;
  messages: Message[];
  onSendMessage: (content: string, contentType: Message['content_type'], fileUrl?: string) => void;
}

export function ChatWindow({ currentUser, selectedUser, messages, onSendMessage }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const contentType: Message['content_type'] = message.startsWith('http') ? 'link' : 'text';
    onSendMessage(message, contentType);
    setMessage('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Here you would typically upload to Supabase storage
      // For now, we'll just simulate it
      const contentType: Message['content_type'] = file.type.startsWith('image/') ? 'image' : 'file';
      onSendMessage(file.name, contentType, URL.createObjectURL(file));
    } finally {
      setIsUploading(false);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <img
            src={selectedUser.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.full_name)}`}
            alt={selectedUser.full_name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{selectedUser.full_name}</h3>
            <p className="text-sm text-gray-500">{selectedUser.email}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isOwn = msg.sender_id === currentUser.id;
          return (
            <div
              key={msg.id}
              className={clsx('flex', isOwn ? 'justify-end' : 'justify-start')}
            >
              <div
                className={clsx(
                  'max-w-[70%] rounded-lg p-3',
                  isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                )}
              >
                {msg.content_type === 'image' && (
                  <img src={msg.file_url} alt="Shared image" className="rounded-lg mb-2 max-w-full" />
                )}
                {msg.content_type === 'file' && (
                  <a
                    href={msg.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-500 hover:underline"
                  >
                    <AttachFile className="w-4 h-4" />
                    <span>{msg.content}</span>
                  </a>
                )}
                {msg.content_type === 'link' && (
                  <a
                    href={msg.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-500 hover:underline"
                  >
                    <LinkIcon className="w-4 h-4" />
                    <span>{msg.content}</span>
                  </a>
                )}
                {msg.content_type === 'text' && <p>{msg.content}</p>}
                <p className={clsx('text-xs mt-1', isOwn ? 'text-blue-200' : 'text-gray-500')}>
                  {formatDistanceToNow(new Date(msg.created_at))} ago
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <AttachFile className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!message.trim() || isUploading}
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
