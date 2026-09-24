import Icon from './Icon.jsx';
export default function ChapterQuickNav({ chapters, onSummary, summaryButtonRef }) {
  return <nav className="chapter-nav" aria-label="视频章节"><div className="chapter-list" tabIndex={0} aria-label="横向滚动查看章节">{chapters.map(chapter => <span className="chapter-chip" key={chapter.id}>{chapter.time} {chapter.title}</span>)}</div><div className="chapter-gradient" aria-hidden="true" /><button ref={summaryButtonRef} className="summary-button" onClick={onSummary}><Icon name="menu" size={17} />总结</button></nav>;
}
