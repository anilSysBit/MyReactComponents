import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/chat/SideBar';
import { ChatWindow } from '../components/chat/ChatWindow';
import { User, Message } from '../components/chat/types';
import { currentUser, users as dummyUsers, initialMessages } from '../components/chat/dummy-data';

function ChatPage() {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = (
    content: string,
    contentType: Message['content_type'],
    fileUrl?: string
  ) => {
    if (!selectedUser) return;

    const newMessage: Message = {
      id: String(Date.now()),
      sender_id: currentUser.id,
      receiver_id: selectedUser.id,
      content,
      content_type: contentType,
      file_url: fileUrl,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        users={users}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <ChatWindow
        currentUser={currentUser}
        selectedUser={selectedUser}
        messages={messages.filter(msg => 
          (msg.sender_id === currentUser.id && msg.receiver_id === selectedUser?.id) ||
          (msg.sender_id === selectedUser?.id && msg.receiver_id === currentUser.id)
        )}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default ChatPage;