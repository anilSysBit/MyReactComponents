import { User, Message } from './types';

export const currentUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  full_name: 'John Doe',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  created_at: '2024-01-01T00:00:00Z'
};

export const users: User[] = [
  {
    id: '2',
    email: 'sarah.wilson@example.com',
    full_name: 'Sarah Wilson',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    created_at: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    email: 'michael.brown@example.com',
    full_name: 'Michael Brown',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    created_at: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    email: 'emily.davis@example.com',
    full_name: 'Emily Davis',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    created_at: '2024-01-04T00:00:00Z'
  }
];

export const initialMessages: Message[] = [
  {
    id: '1',
    sender_id: '2',
    receiver_id: '1',
    content: 'Hey, how are you?',
    content_type: 'text',
    created_at: '2024-02-26T10:00:00Z'
  },
  {
    id: '2',
    sender_id: '1',
    receiver_id: '2',
    content: 'I\'m good, thanks! How about you?',
    content_type: 'text',
    created_at: '2024-02-26T10:01:00Z'
  },
  {
    id: '3',
    sender_id: '2',
    receiver_id: '1',
    content: 'https://picsum.photos/200/',
    content_type: 'image',
    file_url: 'https://picsum.photos/200/',
    created_at: '2024-02-26T10:02:00Z'
  },
  {
    id: '4',
    sender_id: '1',
    receiver_id: '2',
    content: 'https://example.com',
    content_type: 'link',
    created_at: '2024-02-26T10:03:00Z'
  }
];