'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function VideoDetail() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams();
  const videoId = params.videoId;

  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false); 

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState([]);

  const [logs, setLogs] = useState([]);

   const fetchLogs = async () => {
    const res = await fetch(`${API_URL}/youtube/logs?videoId=${videoId}`);
    const data = await res.json();
    setLogs(data.logs || []);
  };


  const fetchVideo = async () => {
    const res = await fetch(`${API_URL}/youtube/video?videoId=${videoId}`);
    const data = await res.json();

    fetchLogs();
    setVideo(data.video);
    setTitle(data.video.snippet.title);
    setDescription(data.video.snippet.description);
  };

  const saveVideo = async () => {
    await fetch(`${API_URL}/youtube/video`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, title, description }),
    });
    await fetchVideo();
    fetchLogs();
    setIsEditing(false); 
  };

  const fetchComments = async () => {
    const res = await fetch(`${API_URL}/youtube/comments?videoId=${videoId}`);
    const data = await res.json();
    setComments(data.comments || []);
  };
  const addComment = async () => {
    if (!newComment) return;
    await fetch(`${API_URL}/youtube/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, text: newComment }),
    });
    setNewComment("");
    fetchComments();
    fetchLogs();
  };

  const fetchNotes = async () => {
    const res = await fetch(`${API_URL}/youtube/notes?videoId=${videoId}`);
    const data = await res.json();
    setNotes(data.notes || []);
  };
  const addNote = async () => {
    if (!noteText) return;
    await fetch(`${API_URL}/youtube/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, text: noteText }),
    });
    setNoteText("");
    fetchNotes();
    fetchLogs();
  };

  useEffect(() => {
    fetchVideo();
    fetchComments();
    fetchNotes();
  }, [videoId]);

  if (!video) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Video: {video.snippet.title}</h2>
      <img src={video.snippet.thumbnails.medium.url} alt="thumbnail" />

      {/* --- Editable Title & Description --- */}
      <div style={{ margin: "20px 0" }}>
        {isEditing ? (
          <>
            <label>Title:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%" }}
            />
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%" }}
            />
            <button onClick={saveVideo} style={{ marginTop: 10 }}>
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                fetchVideo(); // revert changes
              }}
              style={{ marginTop: 10, marginLeft: 10 }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p><b>Title:</b> {title}</p>
            <p><b>Description:</b> {description}</p>
            <button onClick={() => setIsEditing(true)}>Edit Title/Description</button>
          </>
        )}
      </div>

      {/* Comments */}
      <div style={{ marginBottom: 40 }}>
        <h3>Comments</h3>
        <input
          placeholder="Add comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ width: "80%" }}
        />
        <button onClick={addComment}>Add</button>
        <ul>
          {comments.map((c) => (
            <li key={c.id} style={{ marginTop: 10 }}>
              {c.snippet.topLevelComment.snippet.textOriginal}
              <button
                onClick={() => deleteComment(c.id)}
                style={{ marginLeft: 10 }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Notes */}
      <div style={{ marginBottom: 40 }}>
        <h3>Notes</h3>
        <textarea
          placeholder="Add note"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          style={{ width: "100%" }}
        />
        <button onClick={addNote} style={{ marginTop: 5 }}>
          Add Note
        </button>
        <ul>
          {notes.map((n) => (
            <li key={n.id}>
              {n.text} - <small>{new Date(n.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Logs */}
      <div style={{ marginBottom: 40 }}>
        <h3>Logs</h3>
        <ul>
          {logs.map((l) => (
            <li key={l.id}>
              [{new Date(l.timestamp).toLocaleString()}] {l.event_type} -{" "}
              {JSON.stringify(l.details)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
