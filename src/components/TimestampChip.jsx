export default function TimestampChip({ time, active = false }) {
  return <span className={`timestamp-chip ${active ? 'active' : ''}`}><svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" aria-hidden="true"><path d="M1 1v8l6-4Z" /></svg>{time}</span>;
}
