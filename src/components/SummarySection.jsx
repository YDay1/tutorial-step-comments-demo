import TimestampChip from './TimestampChip.jsx';
import StepDiscussion from './StepDiscussion.jsx';
export default function SummarySection({ section, active }) {
  return <section className={`summary-section ${active ? 'active' : ''}`}><h3><TimestampChip time={section.time} active={active} /><span>{section.title}</span></h3><p>{section.description}</p>{section.discussion && <StepDiscussion discussion={section.discussion} stepId={section.id} />}</section>;
}
