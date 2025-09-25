import axios from "axios";

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

type Props = {
  params: { id: string }; // ✅ ไม่ต้องเป็น Promise
};

export default async function CommentsPage({ params }: Props) {
  const { id } = params; // ✅ ใช้ตรง ๆ ได้เลย
  const res = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  const comments = res.data;

  return (
    <div>
      <h1>Comments for Post {id}</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {comments.map((c) => (
          <li
            key={c.id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
            }}
          >
            <h3>{c.name} ({c.email})</h3>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
