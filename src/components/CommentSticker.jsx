export default function CommentSticker({ sticker, inline = false }) {
  return <span className={`comment-sticker-art comment-sticker-${sticker.index} ${inline ? 'comment-sticker-inline' : ''}`} data-comment-sticker={inline ? sticker.id : undefined} role={inline ? 'img' : undefined} aria-label={inline ? sticker.label : undefined} aria-hidden={inline ? undefined : true}>{inline ? sticker.token : null}</span>;
}
