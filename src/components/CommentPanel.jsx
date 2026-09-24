import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import CommentComposer from './CommentComposer.jsx';
import CommentItem from './CommentItem.jsx';
import { commentUser, defaultCommentContext, initialComments } from '../data/comment-data.js';
import '../comments.css';

export default function CommentPanel({ open, onClose }) {
  const [isCommentComposerOpen, setIsCommentComposerOpen] = useState(true);
  const [attachedTimestamp, setAttachedTimestamp] = useState(defaultCommentContext.timestamp);
  const [attachedStep, setAttachedStep] = useState(defaultCommentContext.step);
  const [commentText, setCommentText] = useState('');
  const [publishedComments, setPublishedComments] = useState([]);
  const listRef = useRef(null);
  const closeRef = useRef(null);
  const context = attachedTimestamp ? { timestamp: attachedTimestamp, step: attachedStep } : null;
  function beginComment() {
    setAttachedTimestamp(defaultCommentContext.timestamp);
    setAttachedStep(defaultCommentContext.step);
    setCommentText('');
    setIsCommentComposerOpen(true);
  }
  useEffect(() => { if (open) beginComment(); }, [open]);
  function sendComment() {
    if (!commentText.trim()) return;
    setPublishedComments(comments => [{ id: crypto.randomUUID(), author: commentUser.name, avatar: commentUser.avatar, text: commentText.trim(), context, meta: '刚刚', likes: 0, replies: 0 }, ...comments]);
    setCommentText('');
    setIsCommentComposerOpen(false);
    requestAnimationFrame(() => { if (listRef.current) listRef.current.scrollTop = 0; closeRef.current?.focus({ preventScroll: true }); });
  }
  function handleKeys(event) {
    if (event.key === 'Escape') { event.stopPropagation(); onClose(); }
    if (event.key !== 'Tab') return;
    const controls = [...event.currentTarget.querySelectorAll('button:not(:disabled), textarea, [tabindex="0"]')];
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  if (!open) return null;
  return <section className="comment-panel" role="dialog" aria-modal="true" aria-labelledby="comment-panel-title" onKeyDown={handleKeys}>
    <header className="comment-panel-header"><div className="comment-search">大家都在搜：<span>image2怎么免费使用教程<Icon name="search" size={13} /></span></div><button ref={closeRef} className="comment-close" onClick={onClose} aria-label="关闭评论"><Icon name="close" size={22} /></button><h2 id="comment-panel-title">共 {153 + publishedComments.length} 条评论</h2></header>
    <div className="comment-list" ref={listRef} tabIndex={isCommentComposerOpen ? -1 : 0} inert={isCommentComposerOpen ? true : undefined} aria-label="评论列表">{[...publishedComments, ...initialComments].map(comment => <CommentItem key={comment.id} comment={comment} />)}</div>
    {isCommentComposerOpen ? <><div className="comment-composer-scrim" aria-hidden="true" /><CommentComposer context={context} text={commentText} onTextChange={setCommentText} onRemoveContext={() => { setAttachedTimestamp(null); setAttachedStep(null); }} onSend={sendComment} /></> : <footer className="comment-list-footer"><button onClick={beginComment}>说点什么…<Icon name="voice" size={21} /><Icon name="camera" size={22} /></button></footer>}
  </section>;
}
