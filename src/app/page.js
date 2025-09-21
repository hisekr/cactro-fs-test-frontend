'use client'
import React from "react";

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div style={{ padding: 40 }}>
      <h1>Login with Google</h1>
      <a href={`${API_URL}/auth/google`}>
        <button style={{ padding: 10, fontSize: 16 }}>Login</button>
      </a>
    </div>
  );
}
