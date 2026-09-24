import { useRef, useState } from 'react';
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
  const commentButtonRef = useRef(null);
  function closeComments() {
    setCommentsOpen(false);
    requestAnimationFrame(() => commentButtonRef.current?.focus({ preventScroll: true }));
  }
  function closeSummary() {
    setSummaryOpen(false);
    requestAnimationFrame(() => summaryButtonRef.current?.focus());
  }
  return <section className={`video-detail ${summaryOpen ? 'summary-open' : ''}`} aria-label="视频详情页">
    <div className="detail-base" inert={summaryOpen || commentsOpen ? true : undefined}>
      <StatusBar dark summary={summaryOpen} />
      <div className="detail-search"><SearchHeader dark onBack={onBack} /></div>
      <VideoPlayer video={video} compact={summaryOpen} />
      <div className="video-info"><AuthorInfo video={video} /><div className={`video-title ${titleExpanded ? 'expanded' : ''}`}><p>{video.title}</p><button onClick={() => setTitleExpanded(value => !value)}>{titleExpanded ? '收起' : '展开'}</button></div><p className="author-declaration"><Icon name="speaker" size={16} />{video.declaration}</p><p className="collection"><Icon name="collection" size={17} />合集 · 视频教程 | 去看看</p><ChapterQuickNav chapters={chapters} onSummary={() => setSummaryOpen(true)} summaryButtonRef={summaryButtonRef} /><ProgressBar /><ActionBar video={video} onComment={() => setCommentsOpen(true)} commentButtonRef={commentButtonRef} /></div>
    </div>
    {summaryOpen && <DiandianPanel onClose={closeSummary} />}
    <CommentPanel open={commentsOpen} onClose={closeComments} />
  </section>;
}
