import { create } from 'zustand';
import { User, Client } from '../types';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Subscription {
  coachId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  subscriptions: Subscription[];
  messages: Message[];
  setUser: (user: User | null) => void;
  updateUserProfile: (profileData: Partial<User | Client>) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'coach' | 'client') => Promise<void>;
  signOut: () => Promise<void>;
  addSubscription: (subscription: Subscription) => void;
  sendMessage: (receiverId: string, content: string) => void;
  markMessageAsRead: (messageId: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: '1',
    email: 'client@example.com',
    role: 'client' as const,
    full_name: 'John Doe',
    created_at: new Date().toISOString()
  },
  loading: false,
  subscriptions: [
    {
      coachId: '1',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    }
  ],
  messages: [
    {
      id: '1',
      senderId: '1',
      receiverId: '2',
      content: "Hello! I'm interested in your weight loss program.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true
    },
    {
      id: '2',
      senderId: '2',
      receiverId: '1',
      content: "Hi! Thanks for your interest. I'd be happy to help you achieve your weight loss goals.",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      read: true
    }
  ],
  setUser: (user) => set({ user }),
  updateUserProfile: (profileData) => set((state) => ({
    user: state.user ? { ...state.user, ...profileData } : null
  })),
  signIn: async (email, password) => {
    // Mock authentication
    const mockUser = {
      id: '1',
      email,
      role: 'client' as const,
      full_name: 'John Doe',
      created_at: new Date().toISOString()
    };
    set({ user: mockUser });
  },
  signUp: async (email, password, role) => {
    // Mock registration
    const mockUser = {
      id: '1',
      email,
      role,
      full_name: 'John Doe',
      created_at: new Date().toISOString()
    };
    set({ user: mockUser });
  },
  signOut: async () => {
    set({ user: null, subscriptions: [], messages: [] });
  },
  addSubscription: (subscription) => set((state) => ({
    subscriptions: [...state.subscriptions, subscription]
  })),
  sendMessage: (receiverId, content) => set((state) => {
    if (!state.user) return state;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: state.user.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    return {
      messages: [...state.messages, newMessage]
    };
  }),
  markMessageAsRead: (messageId) => set((state) => ({
    messages: state.messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    )
  }))
}));