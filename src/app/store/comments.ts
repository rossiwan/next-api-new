'use client';
import { create } from 'zustand';
import axios from 'axios';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentState {
  items: Comment[];
  loading: boolean;
  error: string | null;
  fetchComments: (postId: number) => Promise<void>;
}

export const useComments = create<CommentState>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchComments: async (postId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      set({ items: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'เกิดข้อผิดพลาด', loading: false });
    }
  },
}));
