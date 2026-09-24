import Icon from './Icon.jsx';
import TimestampCommentChip from './TimestampCommentChip.jsx';
export default function CommentItem({ comment }) {
  return <article className="comment-item"><img className="comment-avatar" src={comment.avatar} alt="" /><div className="comment-item-body"><p className="comment-author">{comment.author}</p><p className="comment-text">{comment.context && <><TimestampCommentChip context={comment.context} />{' '}</>}{comment.text}</p><div className="comment-meta"><span>{comment.meta}</span><span>回复</span><span className="comment-likes"><Icon name="heart" size={16} />{comment.likes || ''}</span></div>{comment.replies > 0 && <p className="comment-replies">—　展开 {comment.replies} 条回复</p>}</div></article>;
}
