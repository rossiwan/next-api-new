// src/app/(user)/[id]/comments/page.tsx
import axios from "axios";

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

type Props = {
  params: { id: string };
};

export default async function CommentsPage({ params }: Props) {
  const { id } = await params; // ✅ await ก่อนใช้งาน
  const res = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  const comments = res.data;

  return (
    <div>
      <h1>Comments for Post {id}</h1>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            <h3>{c.name} ({c.email})</h3>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
