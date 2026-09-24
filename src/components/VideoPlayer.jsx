import Icon from './Icon.jsx';
export default function VideoPlayer({ video, compact = false }) {
  return <div className={`video-player ${compact ? 'video-player-compact' : ''}`}><img className="video-frame" src={compact ? video.summaryPoster : video.poster} alt={compact ? '中国画风格 AI 短片预览' : '教程视频静帧：作者讲解 AI 短片制作'} />{!compact && <div className="player-tools"><span className="player-pill"><Icon name="fullscreen" size={18} />全屏观看</span><span className="player-pill danmu">弹<span>✓</span></span></div>}</div>;
}
