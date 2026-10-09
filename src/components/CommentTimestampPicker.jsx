import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { chapters, video } from '../data/video-data.js';

const seconds = time => time.split(':').reduce((total, part) => total * 60 + Number(part), 0);
const formatTime = (value, padded = false) => `${String(Math.floor(value / 60)).padStart(padded ? 2 : 1, '0')}:${String(value % 60).padStart(2, '0')}`;

export default function CommentTimestampPicker({ context, onClose, onConfirm }) {
  const duration = seconds(video.duration);
  const [position, setPosition] = useState(Math.min(duration, seconds(context?.timestamp || '2:03')));
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeRef = useRef(null);
  const timerRef = useRef(null);
  const chapterIndex = Math.max(0, chapters.findLastIndex(chapter => seconds(chapter.time) <= position));
  const chapter = chapters[chapterIndex];
  const nearby = chapters.slice(Math.max(0, chapterIndex - 1), Math.min(chapters.length, chapterIndex + 2));
  useEffect(() => {
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => { setEntered(true); closeRef.current?.focus({ preventScroll: true }); });
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); clearTimeout(timerRef.current); };
  }, []);
  function finish(result) {
    if (timerRef.current !== null) return;
    setClosing(true);
    timerRef.current = setTimeout(() => result ? onConfirm(result) : onClose(), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 240);
  }
  function handleKeys(event) {
    event.stopPropagation();
    if (event.key === 'Escape') finish();
    if (event.key !== 'Tab') return;
    const controls = [...event.currentTarget.querySelectorAll('button, input')];
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  return <div className={`comment-timestamp-overlay ${entered ? 'is-entered' : ''} ${closing ? 'is-closing' : ''}`} onPointerDown={event => { if (event.target === event.currentTarget) finish(); }}>
    <section className="comment-timestamp-sheet" role="dialog" aria-modal="true" aria-labelledby="comment-timestamp-title" onKeyDown={handleKeys} inert={closing ? true : undefined}>
      <i className="comment-timestamp-handle" aria-hidden="true" />
      <header><h2 id="comment-timestamp-title">选择时间点</h2><button ref={closeRef} type="button" aria-label="关闭时间点选择" onClick={() => finish()}><Icon name="close" size={21} /></button></header>
      <div className="comment-timestamp-preview"><img src={video.poster} alt="当前教程视频画面" /><span aria-hidden="true"><svg width="17" height="20" viewBox="0 0 17 20"><path fill="white" d="M2 1v18l14-9Z" /></svg></span></div>
      <div className="comment-timestamp-scrub"><input type="range" min="0" max={duration} step="1" value={position} onChange={event => setPosition(Number(event.target.value))} aria-label="选择视频时间点" aria-valuetext={`${formatTime(position, true)} ${chapter.title}`} style={{ '--comment-time-progress': `${position / duration * 100}%` }} /><div><span>00:00</span><span>{video.duration}</span></div></div>
      <div className="comment-timestamp-readout" aria-live="polite"><strong>{formatTime(position, true)}</strong><span>{chapter.title}</span></div>
      <p className="comment-timestamp-nearby-title">附近步骤</p>
      <div className="comment-timestamp-nearby">{nearby.map(item => <button type="button" key={item.id} className={chapter.id === item.id ? 'is-selected' : ''} aria-pressed={chapter.id === item.id} onClick={() => setPosition(seconds(item.time))}><span>{formatTime(seconds(item.time), true)}</span><strong>{item.title}</strong>{chapter.id === item.id && <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path d="m3 10 4 4 10-10" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>}</button>)}</div>
      <footer><button type="button" onClick={() => finish({ timestamp: formatTime(position), step: chapter.title })}>引用这个时间点</button><i aria-hidden="true" /></footer>
    </section>
  </div>;
}
