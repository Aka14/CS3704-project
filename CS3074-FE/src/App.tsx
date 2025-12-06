import "./App.css";
import { useRef, useState } from "react";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function triggerFileSelect() {
    fileInputRef.current?.click(); // safer than non-null assertion
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

  ;(window as any).callGemini = callGemini;
  
  function generateAiSummary() {
	if (!file) {
		alert("Please upload a note skeleton first.");
	    	return;
		}
	alert(`AI Summary would be generated for: ${file.name}`);
  }
  
  
  return (
    <div className="app-container">
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
              e.stopPropagation(); // prevent double handling if desired
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
            aria-hidden="true"
            // accept=".md,.txt,.pdf" // uncomment/adjust if you want to restrict file types
          />

          {file && (
            <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
              Selected file: <strong>{file.name}</strong>
            </p>
          )}
		  
		<button className="ai-summary-btn" onClick={generateAISummary}>
			Generate AI Summary
		</button>
		
        </div>
        <div className="notes-section">
          <h2>Your Notes</h2>

          <div className="note-card">
            <h3>Note 1</h3>
            <p>
              Note 1 summary
            </p>
          </div>

          <div className="note-card">
            <h3>Note 2</h3>
            <p>
              Note 2 summary
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .hidden-input {
          display: none;
        }
        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh; /* full viewport height */
          padding: 1.5rem; /* optional padding */
        }

        .notes-dashboard {
          width: 100%;
          border-radius: 1rem;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
        }

        h1 {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }

        .upload-section {
          border: 2px dashed #9ca3af; /* gray-400 */
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
          font-weight: 600;
          color: #fcfcfcff;
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
