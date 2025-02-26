import React from 'react';
import { User } from './types';
import { formatDistanceToNow } from 'date-fns';
import { Person as UsersIcon } from '@mui/icons-material'; // Import Material UI icon

interface SidebarProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export function Sidebar({ users, selectedUser, onSelectUser }: SidebarProps) {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <UsersIcon className="w-6 h-6 text-gray-600" /> {/* Updated icon */}
          <h2 className="text-xl font-semibold text-gray-800">Contacts</h2>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-100 transition-colors ${
              selectedUser?.id === user.id ? 'bg-gray-100' : ''
            }`}
          >
            <img
              src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}`}
              alt={user.full_name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.full_name}</p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
              <p className="text-xs text-gray-400">
                Joined {formatDistanceToNow(new Date(user.created_at))} ago
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
