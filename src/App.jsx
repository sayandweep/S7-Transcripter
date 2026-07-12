import Transcriber from './components/UrlInput';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Reel Transcriber</h1>
        <p className="text-zinc-400 text-center mb-8">Paste IG / YT / FB Reel link → Get transcript (client-side, free)</p>
        <Transcriber />
      </div>
    </div>
  );
}

export default App;