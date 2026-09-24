import Icon from './Icon.jsx';
export default function SummaryInput() {
  return <footer className="summary-footer"><div className="summary-input" aria-label="消息输入区（本阶段静态展示）"><Icon name="voice" size={22} /><span>发消息或按住说话...</span><Icon name="camera" size={23} /><Icon name="plus" size={22} /></div><p>内容由 AI 生成</p></footer>;
}
