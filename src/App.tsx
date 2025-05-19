import { useState } from 'react';
import type { ChangeEvent } from 'react';
import MyAnimation from './components/ExcaliburAdvanced'; // Keep this if you already have it
import FileLoaderView from './FileLoaderView'; // You’ll create this next
import './App.css';
import ExcaliburAdvanced from './components/ExcaliburAdvanced';

type ViewName = 'animation' | 'fileLoader';

function App() {
  const [activeView, setActiveView] = useState<ViewName>('animation');

  return (
    <>
      <header style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <h1>Quodsi Animation Viewer</h1>
        <nav>
          <button
            onClick={() => setActiveView('animation')}
            style={{ marginRight: '10px', padding: '8px', cursor: 'pointer', backgroundColor: activeView === 'animation' ? '#e0e0e0' : 'transparent' }}
          >
            Animation View
          </button>
          <button
            onClick={() => setActiveView('fileLoader')}
            style={{ padding: '8px', cursor: 'pointer', backgroundColor: activeView === 'fileLoader' ? '#e0e0e0' : 'transparent' }}
          >
            File Loader
          </button>
        </nav>
      </header>

      <main>
        {activeView === 'animation' && <ExcaliburAdvanced />}
        {activeView === 'fileLoader' && <FileLoaderView />}
      </main>
    </>
  );
}

export default App;
