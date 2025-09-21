'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, [API_URL]);

  const fetchVideos = async () => {
    const res = await fetch(`${API_URL}/youtube/my-videos`); 
    const data = await res.json();
    setVideos(data.videos || []);
  };

  useEffect(() => { if (user) fetchVideos(); }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome, {user.name}</h1>
      <img src={user.picture} alt="profile" style={{ borderRadius: "50%" }} />
      <p>{user.email}</p>
      <a href={`${API_URL}/auth/logout`}>Logout</a>

      <hr style={{ margin: "20px 0" }} />

      <h2>Your Uploaded Videos</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {videos.map(video => (
          <div
            key={video.id}
            style={{ cursor: "pointer", width: 300 }}
            onClick={() => router.push(`/dashboard/${video.id}`)}
          >
            <img src={video.snippet.thumbnails.medium.url} alt="thumbnail" style={{ width: "100%" }} />
            <h3>{video.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
