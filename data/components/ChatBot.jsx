'use client';
import { useState } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: 'bot', text: data.text }]);
  };

  return (
    <div style={{ background: '#111827', color: 'white', padding: '20px', borderRadius: '10px', width: '300px' }}>
      <h3>🎬 Asistente IA</h3>
      <div style={{ height: '300px', overflowY: 'auto', background: '#1f2937', padding: '10px', marginBottom: '10px' }}>
        {messages.map((m, i) => (
          <p key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <b>{m.role === 'user' ? 'Tú: ' : 'IA: '}</b>{m.text}
          </p>
        ))}
      </div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} style={{ width: '70%', color: 'black' }} />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
