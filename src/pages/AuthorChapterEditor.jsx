import { useRef, useState } from 'react';
import StatusBar from '../components/StatusBar.jsx';
import Icon from '../components/Icon.jsx';
import { chapters, video } from '../data/video-data.js';
import { useAuthorNote } from '../state/AuthorNoteContext.jsx';
import '../author-editor.css';

export default function AuthorChapterEditor({ onClose }) {
  const { authorNote, setAuthorNote } = useAuthorNote();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const editButtonRef = useRef(null);
  const note = authorNote?.stepId === 'shots' ? authorNote.text : '';
  function editNote() {
    setDraft(note);
    setIsEditing(true);
  }
  function saveNote(event) {
    event.preventDefault();
    if (!draft.trim()) return;
    setAuthorNote({ stepId: 'shots', timestamp: '2:03', text: draft.trim() });
    setIsEditing(false);
    requestAnimationFrame(() => editButtonRef.current?.focus({ preventScroll: true }));
  }
  return <section className="author-editor" aria-label="作者章节编辑器">
    <StatusBar dark summary />
    <img className="author-video" src={video.summaryPoster} alt="AI 短片教程画面" />
    <section className="author-panel" aria-labelledby="author-panel-title">
      <header className="author-panel-header"><h1 id="author-panel-title"><Icon name="menu" size={19} />章节要点</h1><button className="author-close" onClick={onClose} aria-label="关闭作者章节编辑器"><Icon name="close" size={21} /></button></header>
      <div className="author-chapters">{chapters.slice(0, 6).map(chapter => {
        const editable = chapter.id === 'shots';
        return <section key={chapter.id} className={`author-chapter ${editable ? 'author-chapter-active' : ''}`} aria-label={`${chapter.time} ${chapter.title}`}>
          <div className="author-chapter-heading"><span className="author-time"><svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" aria-hidden="true"><path d="M1 1v8l6-4Z" /></svg>{chapter.time}</span><h2>{chapter.title}</h2>{editable && !note && <button className="author-add-note" onClick={isEditing ? () => setIsEditing(false) : editNote} aria-expanded={isEditing} aria-controls="author-note-editor">{isEditing ? '补充说明' : '＋补充说明'}{isEditing && <span aria-hidden="true">⌃</span>}</button>}</div>
          {editable && isEditing && <form id="author-note-editor" className="author-note-form" onSubmit={saveNote}><textarea autoFocus aria-label="补充说明" placeholder="补充这一步的易错点、经验或注意事项" value={draft} onChange={event => setDraft(event.target.value)} /><div className="author-note-actions"><button type="submit" disabled={!draft.trim()}>保存说明</button></div></form>}
          {editable && note && !isEditing && <div className="author-note-display"><div className="author-note-caption"><span>作者补充</span><button ref={editButtonRef} onClick={editNote}>编辑</button></div><p>{note}</p></div>}
        </section>;
      })}</div>
    </section>
  </section>;
}
