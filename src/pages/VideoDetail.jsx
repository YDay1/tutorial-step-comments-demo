import { useLayoutEffect, useRef, useState } from 'react';
import StatusBar from '../components/StatusBar.jsx';
import SearchHeader from '../components/SearchHeader.jsx';
import VideoPlayer from '../components/VideoPlayer.jsx';
import AuthorInfo from '../components/AuthorInfo.jsx';
import ChapterQuickNav from '../components/ChapterQuickNav.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import ActionBar from '../components/ActionBar.jsx';
import DiandianPanel from '../components/DiandianPanel.jsx';
import CommentPanel from '../components/CommentPanel.jsx';
import Icon from '../components/Icon.jsx';
import { video, chapters } from '../data/video-data.js';
export default function VideoDetail({ onBack }) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [titleExpanded, setTitleExpanded] = useState(false);
  const summaryButtonRef = useRef(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentsListVisible, setCommentsListVisible] = useState(false);
  const commentButtonRef = useRef(null);
  const commentListButtonRef = useRef(null);
  const [commentEntry, setCommentEntry] = useState('compose');
  const videoFrameRef = useRef(null);
  const previousVideoRectRef = useRef(null);
  useLayoutEffect(() => {
    const frame = videoFrameRef.current;
    const previous = previousVideoRectRef.current;
    previousVideoRectRef.current = null;
    if (!frame || !previous || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const next = frame.getBoundingClientRect();
    if (previous.left === next.left && previous.top === next.top && previous.width === next.width && previous.height === next.height) return;
    // Animate only the video frame between its actual before/after layout bounds.
    const animation = frame.animate([
      { transform: `translate(${previous.left - next.left}px, ${previous.top - next.top}px)`, width: `${previous.width}px`, height: `${previous.height}px` },
      { transform: 'translate(0, 0)', width: `${next.width}px`, height: `${next.height}px` },
    ], { duration: 320, easing: 'cubic-bezier(.2, .8, .2, 1)' });
    return () => animation.cancel();
  }, [commentsOpen, commentsListVisible, summaryOpen]);
  function openComments(entry) {
    previousVideoRectRef.current = videoFrameRef.current?.getBoundingClientRect();
    setCommentEntry(entry);
    setCommentsListVisible(entry === 'list');
    setCommentsOpen(true);
  }
  function closeComments() {
    previousVideoRectRef.current = videoFrameRef.current?.getBoundingClientRect();
    setCommentsOpen(false);
    setCommentsListVisible(false);
    requestAnimationFrame(() => (commentEntry === 'list' ? commentListButtonRef : commentButtonRef).current?.focus({ preventScroll: true }));
  }
  function openSummary() {
    previousVideoRectRef.current = videoFrameRef.current?.getBoundingClientRect();
    setSummaryOpen(true);
  }
  function showCommentsList() {
    previousVideoRectRef.current = videoFrameRef.current?.getBoundingClientRect();
    setCommentsListVisible(true);
  }
  function closeSummary() {
    previousVideoRectRef.current = videoFrameRef.current?.getBoundingClientRect();
    setSummaryOpen(false);
    requestAnimationFrame(() => summaryButtonRef.current?.focus());
  }
  return <section className={`video-detail ${summaryOpen ? 'summary-open' : ''} ${commentsOpen && commentsListVisible ? 'comment-open' : ''}`} aria-label="视频详情页">
    <div className="detail-base" inert={summaryOpen || commentsOpen ? true : undefined}>
      <StatusBar dark summary={summaryOpen} />
      <div className="detail-search"><SearchHeader dark onBack={onBack} /></div>
      <VideoPlayer video={video} compact={summaryOpen || commentsListVisible} frameRef={videoFrameRef} />
      <div className="video-info"><AuthorInfo video={video} /><div className={`video-title ${titleExpanded ? 'expanded' : ''}`}><p>{video.title}</p><button onClick={() => setTitleExpanded(value => !value)}>{titleExpanded ? '收起' : '展开'}</button></div><p className="author-declaration"><Icon name="speaker" size={16} />{video.declaration}</p><p className="collection"><Icon name="collection" size={17} />合集 · 视频教程 | 去看看</p><ChapterQuickNav chapters={chapters} onSummary={openSummary} summaryButtonRef={summaryButtonRef} /><ProgressBar /><ActionBar video={video} onComment={() => openComments('compose')} onOpenComments={() => openComments('list')} commentButtonRef={commentButtonRef} commentListButtonRef={commentListButtonRef} /></div>
    </div>
    {summaryOpen && <DiandianPanel onClose={closeSummary} />}
    <CommentPanel open={commentsOpen} initialView={commentEntry} onClose={closeComments} onShowList={showCommentsList} />
  </section>;
}
