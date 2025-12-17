import "./App.css";
import { useRef, useState } from "react";
import Login from "./Login";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  function triggerFileSelect() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
  }

  async function callGemini(prompt: string) {
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.error("Gemini API error:", err);
      return { error: err instanceof Error ? err.message : String(err) };
    }
  }

  (window as any).callGemini = callGemini;

  return (
    <div className="app-container relative min-h-screen">
      {/* LOGIN BUTTON (top-right) */}
      {!user && (
        <button
          onClick={() => setShowLogin(true)}
          className="position: abosolute top:1rem right:1rem bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 shadow-lg"
        >
          Login
        </button>
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30">
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <Login
              onLogin={(email) => {
                setUser(email);
                setShowLogin(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="notes-dashboard">
        <h1>Notes Dashboard</h1>

        <div
          className="upload-section"
          onClick={triggerFileSelect}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") triggerFileSelect();
          }}
        >
          <p>Upload Note Skeleton</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerFileSelect();
            }}
          >
            Choose File
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden-input"
          />

          {file && (
            <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
              Selected file: <strong>{file.name}</strong>
            </p>
          )}
        </div>

        {/* NOTES ONLY IF LOGGED IN */}
        {user && (
          <div className="notes-section">
            <h2>Your Notes</h2>

            <div className="note-card">
              <h3>Note 1</h3>
              <p>Note 1 summary</p>
              <button
                className="mt-2 bg-green-600 text-white p-2 rounded-xl hover:bg-green-700"
                onClick={() => alert("Share link generated!")}
              >
                Share Note
              </button>
            </div>

            <div className="note-card">
              <h3>Note 2</h3>
              <p>Note 2 summary</p>
              <button
                className="mt-2 bg-green-600 text-white p-2 rounded-xl hover:bg-green-700"
                onClick={() => alert("Share link generated!")}
              >
                Share Note
              </button>
            </div>
          </div>
        )}
      </div>

      {/* INLINE STYLES */}
      <style>{`
        .hidden-input {
          display: none;
        }
        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1.5rem;
        }
        .notes-dashboard {
          width: 100%;
          border-radius: 1rem;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
        }
        .upload-section {
          border: 2px dashed #9ca3af;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          margin-bottom: 1.5rem;
        }
        .upload-section:hover {
          background-color: #e8dce1ff;
        }
        .upload-section button {
          padding: 0.5rem 1rem;
          background-color: #3b82f6;
          color: white;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
        }
        .upload-section button:hover {
          background-color: #2563eb;
        }
        .notes-section h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .note-card {
          background-color: #861F41;
          padding: 1rem;
          border-radius: 0.75rem;
          margin-bottom: 1rem;
        }
        .note-card h3 {
          color: white;
          margin-bottom: 0.25rem;
        }
        .note-card p {
          color: #d7c9c9ff;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
