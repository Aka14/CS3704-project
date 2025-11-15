import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <div className="notes-dashboard">
        <h1>Notes Dashboard</h1>

        <div className="upload-section">
          <p>Upload Note Skeleton</p>
          <button>Choose File</button>
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
        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh; /* full viewport height */
          padding: 1.5rem; /* optional padding */
        }

        .notes-dashboard {
          max-width: 600px;
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
          background-color: #861F41; 
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
          margin-bottom: 0.25rem;
        }

        .note-card p {
          color: #000;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
