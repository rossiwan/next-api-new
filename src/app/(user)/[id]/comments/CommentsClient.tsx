'use client';

import { useEffect } from 'react';
import { useComments } from '@/app/store/comments';
import Link from 'next/link';

interface CommentsClientProps {
  postId: number;
}

export default function CommentsClient({ postId }: CommentsClientProps) {
  const { items, loading, error, fetchComments } = useComments();

  useEffect(() => {
    fetchComments(postId);
  }, [postId, fetchComments]);

  if (loading) return <p>⏳ กำลังโหลด...</p>;
  if (error) return <p>❌ ผิดพลาด: {error}</p>;

  return (
    <div>
      <h1>💬 Comments for Post {postId}</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(c => (
          <li
            key={c.id}
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
          >
            <h3>{c.name}</h3>
            <p><strong>Email:</strong> {c.email}</p>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
      <Link href="/post-client">⬅️ กลับไปหน้า Posts</Link>
    </div>
  );
}
