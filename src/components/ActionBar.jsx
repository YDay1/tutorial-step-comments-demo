import Icon from './Icon.jsx';
export default function ActionBar({ video, onComment, onOpenComments, commentButtonRef, commentListButtonRef }) {
  return <div className="action-bar"><button ref={commentButtonRef} onClick={onComment} className="comment-placeholder"><Icon name="edit" size={19} /><span>说点什么…</span></button><span className="action-count"><Icon name="actionHeart" size={26} />{video.likes}</span><span className="action-count"><Icon name="actionStar" size={26} />{video.saves}</span><button ref={commentListButtonRef} onClick={onOpenComments} className="action-count comment-list-trigger" aria-label={`查看 ${video.comments} 条评论`}><Icon name="actionComment" size={26} />{video.comments}</button></div>;
}
