export default function AuthorInfo({ video }) {
  return <div className="author-info"><img src={video.avatar} alt="阿进的 studio 头像" /><strong>{video.author}</strong><button className="follow-label" disabled aria-label="关注（静态展示）">关注</button><span className="video-duration">{video.duration}</span></div>;
}
