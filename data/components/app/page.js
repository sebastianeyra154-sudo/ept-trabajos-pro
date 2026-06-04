'use client';
import { useState } from 'react';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState(null);

  return (
    <main style={{ background: '#030712', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Indie Filmmakers Hub</h1>
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '40px' }}>
        
        {/* Lado del Video */}
        <div>
          <h2>Sube tu Video</h2>
          <input type="file" accept="video/*" onChange={e => setVideoUrl(URL.createObjectURL(e.target.files[0]))} />
          <br /><br />
          {videoUrl && <video src={videoUrl} controls style={{ width: '400px', borderRadius: '8px' }} />}
        </div>

        {/* Lado del Chatbot */}
        <ChatBot />
      </div>
    </main>
  );
}
