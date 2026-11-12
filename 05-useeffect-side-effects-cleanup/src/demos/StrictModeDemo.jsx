import { useEffect, useState } from 'react';

// A pretend chat connection. Real ones (WebSocket, SDK clients) behave the same:
// whatever connect() opens, disconnect() must close.
function createConnection(roomId) {
  return {
    connect() {
      console.log(`✅ connect to "${roomId}"`);
    },
    disconnect() {
      console.log(`❌ disconnect from "${roomId}"`);
    },
  };
}

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <p>
      Connected to <span className="output">#{roomId}</span>
    </p>
  );
}

export default function StrictModeDemo() {
  const [roomId, setRoomId] = useState('general');
  const [open, setOpen] = useState(true);

  return (
    <div className="card">
      <p className="hint">
        Open the console and reload. In development you'll see connect, disconnect, connect: that's
        Strict Mode checking your cleanup. Switch rooms and you'll see one disconnect followed by one
        connect. Run <code>pnpm build && pnpm preview</code> and the extra pair disappears.
      </p>
      <div className="controls">
        <label className="inline">
          Room{' '}
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            <option value="general">general</option>
            <option value="react">react</option>
            <option value="random">random</option>
          </select>
        </label>
        <button type="button" onClick={() => setOpen((o) => !o)}>
          {open ? 'Leave chat' : 'Join chat'}
        </button>
      </div>
      {open && <ChatRoom roomId={roomId} />}
    </div>
  );
}
