import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import SummarySection from './SummarySection.jsx';
import SummaryInput from './SummaryInput.jsx';
import { summary } from '../data/summary-data.js';
export default function DiandianPanel({ onClose }) {
  const closeRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { closeRef.current?.focus(); }, []);
  function handleKeyDown(event) {
    if (event.key === 'Escape') onClose();
    if (event.key === 'Tab') {
      const controls = [...event.currentTarget.querySelectorAll('button, [tabindex="0"]')];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }
  return <section className={`diandian-panel ${expanded ? 'expanded' : ''}`} role="dialog" aria-modal="true" aria-labelledby="diandian-title" onKeyDown={handleKeyDown}>
    <header className="panel-header"><button ref={closeRef} className="icon-button" onClick={onClose} aria-label="关闭点点总结"><Icon name="close" size={22} /></button><h2 id="diandian-title"><i className="mint-mark" />点点</h2><button className="icon-button" onClick={() => setExpanded(value => !value)} aria-label={expanded ? '收起面板' : '放大面板'} aria-expanded={expanded}><Icon name="expand" size={23} /></button></header>
    <div className="summary-body"><div className="summary-scroll" tabIndex={0} aria-label="点点总结正文"><article className="summary-card"><h1>{summary.title}</h1><p className="summary-intro">{summary.intro}<strong>{summary.emphasis}</strong></p>{summary.sections.map((section, index) => <SummarySection key={section.id} section={section} active={index === 0} />)}</article></div></div>
    <SummaryInput />
  </section>;
}
