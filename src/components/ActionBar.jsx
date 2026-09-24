import Icon from './Icon.jsx';
export default function ActionBar({ video, onComment, commentButtonRef }) {
  return <div className="action-bar"><button ref={commentButtonRef} onClick={onComment} className="comment-placeholder"><Icon name="edit" size={19} /><span>说点什么…</span></button><span className="action-count"><Icon name="heart" size={26} />{video.likes}</span><span className="action-count"><Icon name="star" size={26} />{video.saves}</span><span className="action-count"><Icon name="comment" size={26} />{video.comments}</span></div>;
}
