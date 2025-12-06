import { useState } from "react";

export default function NotesWithAISummary() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const handleSummarize = () => {
    setSummary("AI summary will appear here.");
  };

  const handleFlashcards = () => {
    setFlashcards([
      "Flashcard 1 placeholder",
      "Flashcard 2 placeholder",
    ]);
  };

  return (
    <div id="root" className="w-1/2 mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Notes Tool</h1>

      <textarea
        className="w-full h-48 p-4 border rounded-xl shadow mb-4"
        placeholder="enter notes here"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="flex justify-center gap-4 mb-6">
        <button
          className="px-4 py-2 rounded-xl shadow bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSummarize}
        >
          Generate AI Summary
        </button>

        <button
          className="px-4 py-2 rounded-xl shadow bg-green-500 text-white hover:bg-green-600"
          onClick={handleFlashcards}
        >
          Create Flashcards
        </button>
      </div>

      {summary && (
        <div className="p-4 border rounded-xl shadow mb-6 text-left bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">AI Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {flashcards.length > 0 && (
        <div className="p-4 border rounded-xl shadow text-left bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Generated Flashcards</h2>
          <ul className="list-disc ml-5">
            {flashcards.map((card, index) => (
              <li key={index}>{card}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
