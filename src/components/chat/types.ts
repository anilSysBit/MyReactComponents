export interface User {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string;
    created_at: string;
  }
  
  export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    content_type: 'text' | 'image' | 'file' | 'link';
    file_url?: string;
    created_at: string;
  }