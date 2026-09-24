export default function TimestampCommentChip({ context, onRemove }) {
  if (!context?.timestamp) return null;
  return <span className={`comment-time-chip ${onRemove ? 'comment-time-removable' : ''}`}>
    <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" aria-hidden="true"><path d="M1 1v8l6-4Z" /></svg>
    <span>{context.timestamp}{context.step ? ` · ${context.step}` : ''}</span>
    {onRemove && <button type="button" onClick={onRemove} aria-label="移除时间点">×</button>}
  </span>;
}
