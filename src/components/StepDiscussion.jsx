import { useId, useState } from 'react';
import { useAuthorNote } from '../state/AuthorNoteContext.jsx';
import '../step-discussion.css';

export default function StepDiscussion({ discussion, stepId }) {
  const { authorNote } = useAuthorNote();
  const note = authorNote?.stepId === stepId && authorNote.text?.trim() ? authorNote.text : null;
  const [isStepDiscussionExpanded, setIsStepDiscussionExpanded] = useState(false);
  const contentId = useId();
  return <div className="step-discussion">
    <button className="step-discussion-toggle" aria-expanded={isStepDiscussionExpanded} aria-controls={contentId} onClick={() => setIsStepDiscussionExpanded(value => !value)}>
      <span>关于这一步 · {discussion.count} 条讨论{note ? ' · 作者已补充' : ''}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={isStepDiscussionExpanded ? 'm4 10 4-4 4 4' : 'm6 4 4 4-4 4'} /></svg>
    </button>
    <div id={contentId} hidden={!isStepDiscussionExpanded} className="step-discussion-content">
      {note && <div className="step-discussion-author-note"><p className="step-discussion-author-note-label">作者补充</p><p className="step-discussion-author-note-text">{note}</p></div>}
      <p className="step-discussion-label">相关讨论 {discussion.previews.length} 条</p>
      <ul className="step-discussion-list">{discussion.previews.map(item => <li key={item.id}><p className="step-discussion-author">{item.author}</p><p className="step-discussion-text">{item.content}</p></li>)}</ul>
      <button className="step-discussion-all" type="button" aria-disabled="true">查看全部 {discussion.count} 条</button>
    </div>
  </div>;
}
