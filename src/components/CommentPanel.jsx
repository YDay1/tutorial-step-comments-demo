import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import CommentComposer from './CommentComposer.jsx';
import CommentItem from './CommentItem.jsx';
import CommentTools from './CommentTools.jsx';
import { commentUser, defaultCommentContext, initialComments } from '../data/comment-data.js';
import '../comments.css';

export default function CommentPanel({ open, initialView = 'compose', onClose, onShowList }) {
  const [isCommentComposerOpen, setIsCommentComposerOpen] = useState(true);
  const [isDirectEntry, setIsDirectEntry] = useState(initialView === 'compose');
  const [attachedTimestamp, setAttachedTimestamp] = useState(defaultCommentContext.timestamp);
  const [attachedStep, setAttachedStep] = useState(defaultCommentContext.step);
  const [commentText, setCommentText] = useState('');
  const [publishedComments, setPublishedComments] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const panelRef = useRef(null);
  const closeTimerRef = useRef(null);
  const listRef = useRef(null);
  const closeRef = useRef(null);
  const inputEntryRef = useRef(null);
  const draftStartedRef = useRef(false);
  const context = attachedTimestamp ? { timestamp: attachedTimestamp, step: attachedStep } : null;
  const requestClose = useCallback(() => {
    if (closeTimerRef.current !== null) return;
    setIsClosing(true);
    setIsCommentComposerOpen(false);
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : isDirectEntry ? 340 : 320;
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setIsClosing(false);
      setHasEntered(false);
      onClose();
    }, duration);
  }, [onClose, isDirectEntry]);
  useEffect(() => () => clearTimeout(closeTimerRef.current), []);
  useEffect(() => {
    if (!open) return;
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setHasEntered(true));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [open]);
  useEffect(() => {
    if (!open || isCommentComposerOpen || isClosing) return;
    const phone = panelRef.current?.closest('.phone');
    if (!phone) return;
    function dismissOutsidePanel(event) {
      if (!panelRef.current?.contains(event.target)) requestClose();
    }
    phone.addEventListener('pointerdown', dismissOutsidePanel);
    return () => phone.removeEventListener('pointerdown', dismissOutsidePanel);
  }, [open, isCommentComposerOpen, isClosing, requestClose]);
  function beginComment() {
    if (!draftStartedRef.current) {
      setAttachedTimestamp(defaultCommentContext.timestamp);
      setAttachedStep(defaultCommentContext.step);
      setCommentText('');
    }
    draftStartedRef.current = true;
    setIsCommentComposerOpen(true);
  }
  function dismissComment() {
    if (isDirectEntry) { requestClose(); return; }
    setIsCommentComposerOpen(false);
    requestAnimationFrame(() => inputEntryRef.current?.focus({ preventScroll: true }));
  }
  useLayoutEffect(() => {
    if (!open) return;
    setIsDirectEntry(initialView === 'compose');
    if (initialView === 'compose') beginComment();
    else {
      setIsCommentComposerOpen(false);
      requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    }
  }, [open, initialView]);
  function sendComment() {
    if (!commentText.trim()) return;
    setPublishedComments(comments => [{ id: crypto.randomUUID(), author: commentUser.name, avatar: commentUser.avatar, text: commentText.trim(), context, meta: '刚刚', likes: 0, replies: 0 }, ...comments]);
    draftStartedRef.current = false;
    setIsDirectEntry(false);
    onShowList?.();
    setIsCommentComposerOpen(false);
    requestAnimationFrame(() => { if (listRef.current) listRef.current.scrollTop = 0; closeRef.current?.focus({ preventScroll: true }); });
  }
  function handleKeys(event) {
    if (event.key === 'Escape') { event.stopPropagation(); requestClose(); }
    if (event.key !== 'Tab') return;
    const controls = [...event.currentTarget.querySelectorAll('button:not(:disabled), [contenteditable="true"], [tabindex="0"]')].filter(element => !element.closest('[inert]'));
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  if (!open) return null;
  return <section ref={panelRef} className={`comment-panel ${isDirectEntry ? 'comment-panel-direct' : ''} ${hasEntered ? 'is-entered' : ''} ${isClosing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-label={isDirectEntry ? '发表评论' : undefined} aria-labelledby={isDirectEntry ? undefined : 'comment-panel-title'} onKeyDown={handleKeys} inert={isClosing ? true : undefined}>
    {!isDirectEntry && <>
    <header className="comment-panel-header"><div className="comment-search">大家都在搜：<span>image2怎么免费使用教程<Icon name="search" size={13} /></span></div><button ref={closeRef} className="comment-close" onClick={requestClose} aria-label="关闭评论"><Icon name="close" size={22} /></button><h2 id="comment-panel-title">共 {153 + publishedComments.length} 条评论</h2></header>
    <div className="comment-list" ref={listRef} tabIndex={isCommentComposerOpen ? -1 : 0} inert={isCommentComposerOpen ? true : undefined} aria-label="评论列表">{[...publishedComments, ...initialComments].map(comment => <CommentItem key={comment.id} comment={comment} />)}</div>
    {!isCommentComposerOpen && <footer className="comment-list-footer"><button ref={inputEntryRef} aria-label="说点什么…" onClick={beginComment}>爱评论的人运气都不差<CommentTools compact /></button></footer>}
    </>}
    <CommentComposer active={isCommentComposerOpen} context={context} text={commentText} onTextChange={setCommentText} onRemoveContext={() => { setAttachedTimestamp(null); setAttachedStep(null); }} onContextChange={next => { setAttachedTimestamp(next.timestamp); setAttachedStep(next.step); }} onSend={sendComment} onDismiss={dismissComment} />
  </section>;
}
