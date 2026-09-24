import { useState } from 'react';
import SearchPage from './pages/SearchPage.jsx';
import VideoDetail from './pages/VideoDetail.jsx';
import AuthorChapterEditor from './pages/AuthorChapterEditor.jsx';
import { AuthorNoteContext } from './state/AuthorNoteContext.jsx';

export default function App() {
  const [page, setPage] = useState('search');
  const [demoMode, setDemoMode] = useState('user');
  const [authorNote, setAuthorNote] = useState(null);
  return <AuthorNoteContext.Provider value={{ authorNote, setAuthorNote }}><main className="demo-stage"><div className="demo-mode-workspace">
    <nav className="demo-mode-control" aria-label="演示身份切换"><button aria-pressed={demoMode === 'user'} onClick={() => setDemoMode('user')}>用户端</button><span aria-hidden="true">|</span><button aria-pressed={demoMode === 'author'} onClick={() => setDemoMode('author')}>作者端</button></nav>
    <div className="phone" aria-label="390 × 844 移动端演示"><div hidden={demoMode !== 'user'}>
    <div hidden={page !== 'search'}><SearchPage onOpenVideo={() => setPage('video')} /></div>
    {page === 'video' && <VideoDetail onBack={() => setPage('search')} />}
    </div>{demoMode === 'author' && <AuthorChapterEditor onClose={() => setDemoMode('user')} />}</div>
  </div></main></AuthorNoteContext.Provider>;
}
