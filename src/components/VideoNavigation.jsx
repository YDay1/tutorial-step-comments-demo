import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SearchPage from '../pages/SearchPage.jsx';
import VideoDetail from '../pages/VideoDetail.jsx';
import { video } from '../data/video-data.js';
import '../video-navigation.css';

const easing = 'cubic-bezier(.2, .8, .2, 1)';
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function VideoNavigation() {
  const [page, setPage] = useState('search');
  const [transition, setTransition] = useState(null);
  const rootRef = useRef(null);
  const detailRef = useRef(null);
  const mediaRef = useRef(null);
  const coverRef = useRef(null);
  const posterRef = useRef(null);
  const sourceButtonRef = useRef(null);
  const pendingFocusRef = useRef(null);
  const busyRef = useRef(false);

  useEffect(() => {
    // Decode the existing local still before the user opens the card.
    const image = new Image();
    image.src = video.poster;
    image.decode().catch(() => {});
  }, []);

  function openVideo(event) {
    if (busyRef.current) return;
    sourceButtonRef.current = event.currentTarget;
    const cover = event.currentTarget.querySelector('.feed-cover');
    if (cover && !reduceMotion()) {
      busyRef.current = true;
      setTransition({ direction: 'open', cover: cover.currentSrc, bounds: cover.getBoundingClientRect() });
    }
    if (!busyRef.current) pendingFocusRef.current = 'detail';
    setPage('video');
  }

  function closeVideo() {
    if (busyRef.current) return;
    const cover = sourceButtonRef.current?.querySelector('.feed-cover');
    if (!cover || reduceMotion()) {
      pendingFocusRef.current = 'search';
      setPage('search');
      return;
    }
    busyRef.current = true;
    setTransition({ direction: 'close', cover: cover.currentSrc, bounds: cover.getBoundingClientRect() });
  }

  useLayoutEffect(() => {
    if (!transition) return;
    const detail = detailRef.current;
    const frame = detail.querySelector('.video-frame');
    const origin = rootRef.current.getBoundingClientRect();
    const frameBounds = frame.getBoundingClientRect();
    const opening = transition.direction === 'open';
    const duration = reduceMotion() ? 1 : opening ? 380 : 320;
    const rectStyle = (bounds, radius) => ({
      transform: `translate(${bounds.left - origin.left}px, ${bounds.top - origin.top}px)`,
      width: `${bounds.width}px`, height: `${bounds.height}px`, borderRadius: `${radius}px`,
    });
    const coverStyle = rectStyle(transition.bounds, 5);
    const frameStyle = rectStyle(frameBounds, 0);
    const cardClip = `inset(${transition.bounds.top - origin.top}px ${origin.right - transition.bounds.right}px ${origin.bottom - transition.bounds.bottom}px ${transition.bounds.left - origin.left}px round 5px)`;
    const fullClip = 'inset(0px 0px 0px 0px round 0px)';
    const options = { duration, easing, fill: 'both' };
    const animations = [
      mediaRef.current.animate(opening ? [coverStyle, frameStyle] : [frameStyle, coverStyle], options),
      detail.animate(opening ? [{ clipPath: cardClip }, { clipPath: fullClip }] : [{ clipPath: fullClip }, { clipPath: cardClip }], options),
      coverRef.current.animate(opening
        ? [{ opacity: 1 }, { opacity: 1, offset: .25 }, { opacity: 0, offset: .8 }, { opacity: 0 }]
        : [{ opacity: 0 }, { opacity: 1, offset: .8 }, { opacity: 1 }], options),
      posterRef.current.animate(opening
        ? [{ opacity: 0 }, { opacity: 0, offset: .25 }, { opacity: 1, offset: .8 }, { opacity: 1 }]
        : [{ opacity: 1 }, { opacity: 0, offset: .8 }, { opacity: 0 }], options),
    ];
    // Only the transient media changes geometry; page controls keep their final layout.
    if (opening) {
      detail.querySelectorAll('.detail-search, .player-tools, .video-info').forEach(element => {
        animations.push(element.animate([
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 0, transform: 'translateY(8px)', offset: .6 },
          { opacity: 1, transform: 'translateY(0)' },
        ], options));
      });
    }
    let active = true;
    Promise.all(animations.map(animation => animation.finished)).then(() => {
      if (!active) return;
      pendingFocusRef.current = opening ? 'detail' : 'search';
      if (!opening) setPage('search');
      setTransition(null);
      busyRef.current = false;
    }).catch(() => {});
    return () => {
      active = false;
      animations.forEach(animation => animation.cancel());
    };
  }, [transition]);

  useLayoutEffect(() => {
    if (transition || !pendingFocusRef.current) return;
    const target = pendingFocusRef.current === 'detail'
      ? detailRef.current?.querySelector('.back-button') : sourceButtonRef.current;
    pendingFocusRef.current = null;
    if (rootRef.current.getClientRects().length) target?.focus({ preventScroll: true });
  }, [page, transition]);

  return <div ref={rootRef} className={`video-navigation ${transition ? 'is-transitioning' : ''}`}>
    <div aria-hidden={page !== 'search'} inert={page !== 'search' ? true : undefined}>
      <SearchPage onOpenVideo={openVideo} />
    </div>
    {page === 'video' && <div ref={detailRef} className="video-navigation-detail" inert={transition ? true : undefined}>
      <VideoDetail onBack={closeVideo} />
    </div>}
    {transition && <div className="video-navigation-media" ref={mediaRef} aria-hidden="true">
      <img ref={coverRef} src={transition.cover} alt="" />
      <img ref={posterRef} src={video.poster} alt="" />
    </div>}
  </div>;
}
