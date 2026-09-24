export default function StatusBar({ dark = false, summary = false }) {
  return <div className={`status-bar ${dark ? 'status-dark' : ''}`} aria-label="iOS 状态栏">
    <span>{summary ? '01:26' : dark ? '08:52' : '04:30'}{(!dark || summary) && <svg className="sleep-icon" width="17" height="15" viewBox="0 0 24 20" fill="currentColor" aria-hidden="true"><path d="M2 10h20v7H2ZM3 4h7v5H3Zm11 0h7v5h-7ZM1 15h3v5H1Zm19 0h3v5h-3Z" /></svg>}</span>
    <div className="status-indicators"><span className="signal"><i /><i /><i /><i /></span>
      <svg width="19" height="16" viewBox="0 0 24 20" fill="currentColor" aria-hidden="true"><path d="M1 6Q12-4 23 6l-3 3Q12 2 4 9Zm5 5q6-6 12 0l-3 3q-3-3-6 0Zm3 5q3-3 6 0l-3 3Z" /></svg>
      <span className={`battery ${dark && !summary ? 'charged' : ''}`}>{summary ? '12' : dark ? '29' : '11'}</span>
    </div>
  </div>;
}
