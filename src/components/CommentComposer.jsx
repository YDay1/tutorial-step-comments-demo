import { useEffect, useRef } from 'react';
import TimestampCommentChip from './TimestampCommentChip.jsx';
import Icon from './Icon.jsx';
export default function CommentComposer({ context, text, onTextChange, onRemoveContext, onSend }) {
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus({ preventScroll: true }); }, []);
  return <form className="comment-composer" onSubmit={event => { event.preventDefault(); onSend(); }} aria-label="发表评论"><div className="comment-compose-field">{context && <TimestampCommentChip context={context} onRemove={onRemoveContext} />}<textarea ref={inputRef} value={text} onChange={event => onTextChange(event.target.value)} placeholder="说点什么…" aria-label="评论内容" /></div><div className="comment-compose-actions"><span className="comment-add" aria-label="添加（静态展示）"><Icon name="plus" size={24} /></span><button className="comment-send" type="submit" disabled={!text.trim()}>发送</button></div></form>;
}
