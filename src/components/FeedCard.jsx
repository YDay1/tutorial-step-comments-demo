import Icon from './Icon.jsx';
export default function FeedCard({ item, onOpen }) {
  const content = <><img className="feed-cover" src={item.cover} alt={item.interactive ? '用 Image2 和 sd2 做短片（视频教程）' : item.title} /><div className="feed-copy"><p className="feed-title">{item.title}</p><div className="feed-meta"><img src={item.avatar} alt="" /><div className="feed-author"><span>{item.author}</span><small>{item.date}</small></div><span className="feed-likes"><Icon name="heart" size={15} />{item.likes}</span></div></div></>;
  return item.interactive ? <button className="feed-card" onClick={onOpen} aria-label="打开：用 Image2 和 sd2 做短片（视频教程）">{content}</button> : <article className="feed-card">{content}</article>;
}
