const options = [
  { id: 'camera', title: '拍照', art: <><path d="M6 9h5l2-4h6l2 4h5a2 2 0 0 1 2 2v15H4V11a2 2 0 0 1 2-2Z" /><circle cx="16" cy="17" r="5.5" fill="none" stroke="white" strokeWidth="2" /></> },
  { id: 'note', title: '笔记', art: <><rect x="5" y="4" width="22" height="24" rx="5" /><path d="M11 12h10M11 19h7" stroke="white" strokeWidth="3" strokeLinecap="round" /></> },
  { id: 'location', title: '地点', art: <><path d="M16 2a12 12 0 0 0-12 12c0 8 12 16 12 16s12-8 12-16A12 12 0 0 0 16 2Z" /><circle cx="16" cy="13" r="3.5" fill="white" /></> },
  { id: 'goods', title: '商品', art: <><path d="M9 4h14a3 3 0 0 1 3 3l2 21H4L6 7a3 3 0 0 1 3-3Z" /><path d="M12 9a4 4 0 0 0 8 0" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" /></> },
  { id: 'tools', title: '小工具', art: <><path d="m20 6-8 8a5 5 0 0 0 7 7l5-5M12 26l8-8a5 5 0 0 0-7-7l-5 5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /><path d="M3 10h3M10 3v3M26 22h3M22 26v3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></> },
  { id: 'timestamp', title: '时间戳', art: <><rect x="5" y="4" width="22" height="16" rx="4" /><path d="m14 8 7 4-7 4Z" fill="white" /><path d="M5 25h22M19 23v5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></> },
];

export default function CommentAttachmentPanel({ onTimestamp }) {
  return <section id="comment-attachment-options" className="comment-attachment-panel" aria-label="更多评论工具">
    {options.map(option => {
      const content = <><span className="comment-attachment-tile"><svg viewBox="0 0 32 32" aria-hidden="true">{option.art}</svg></span><span>{option.title}</span></>;
      return option.id === 'timestamp'
        ? <button key={option.id} type="button" className="comment-attachment-option" onClick={onTimestamp}>{content}</button>
        : <div key={option.id} className="comment-attachment-option">{content}</div>;
    })}
  </section>;
}
