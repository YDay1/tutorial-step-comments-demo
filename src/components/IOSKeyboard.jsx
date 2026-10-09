import { useState } from 'react';

function KeyboardIcon({ name }) {
  const paths = {
    shift: <path d="m12 3 9 9h-5v9H8v-9H3Z" />,
    delete: <><path d="M9 5h12v14H9L2 12Z" /><path d="m12 9 6 6m0-6-6 6" /></>,
    smile: <><circle cx="12" cy="12" r="10" /><path d="M7 14q5 7 10 0" /><circle cx="8" cy="9" r=".7" /><circle cx="16" cy="9" r=".7" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4" ry="10" /><path d="M2 12h20M4 6h16M4 18h16" /></>,
    mic: <><rect x="8" y="2" width="8" height="13" rx="4" /><path d="M4 10v2a8 8 0 0 0 16 0v-2M12 20v3" /></>,
    down: <path d="m5 9 7 7 7-7" />,
  };
  return <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function IOSKeyboard({ open, onInsert, onDelete, onDismiss, onSend, canSend }) {
  const [shifted, setShifted] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const rows = numbers ? ['1234567890', '-/:;()¥&@"', '.,?!\''] : ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  return <section className="comment-ios-keyboard" aria-label="iOS 演示键盘" inert={!open ? true : undefined} onPointerDown={event => event.preventDefault()}>
    <div className="comment-ios-candidates"><div>{['我', '你', '小', '设计', '好', '加缪', '不'].map(word => <button type="button" key={word} onClick={() => onInsert(word)}>{word}</button>)}</div><button className="comment-ios-dismiss" type="button" aria-label="收起键盘" onClick={onDismiss}><KeyboardIcon name="down" /></button></div>
    <div className="comment-ios-rows">{rows.map((row, index) => <div key={index} className={`comment-ios-row comment-ios-row-${index + 1}`}>
      {index === 2 && <button type="button" className={`comment-ios-key comment-ios-special ${shifted ? 'is-active' : ''}`} aria-label={numbers ? '更多符号' : '切换大小写'} aria-pressed={shifted} onClick={() => numbers ? onInsert('#') : setShifted(value => !value)}>{numbers ? '#+=' : <KeyboardIcon name="shift" />}</button>}
      <div className="comment-ios-letters">{[...row].map(letter => <button className="comment-ios-key" type="button" key={letter} onClick={() => { onInsert(shifted && !numbers ? letter.toUpperCase() : letter); setShifted(false); }}>{shifted && !numbers ? letter.toUpperCase() : letter}</button>)}</div>
      {index === 2 && <button type="button" className="comment-ios-key comment-ios-special" aria-label="删除一个字符" onClick={onDelete}><KeyboardIcon name="delete" /></button>}
    </div>)}
      <div className="comment-ios-bottom-row"><button type="button" className="comment-ios-key comment-ios-special" onClick={() => setNumbers(value => !value)}>{numbers ? 'ABC' : '123'}</button><button type="button" className="comment-ios-key comment-ios-special" aria-label="插入表情" onClick={() => onInsert('🙂')}><KeyboardIcon name="smile" /></button><button type="button" className="comment-ios-key comment-ios-space" onClick={() => onInsert(' ')}>空格</button><button type="button" className="comment-ios-key comment-ios-send" disabled={!canSend} onClick={onSend}>发送</button></div>
    </div>
    <div className="comment-ios-footer" aria-hidden="true"><KeyboardIcon name="globe" /><KeyboardIcon name="mic" /><i /></div>
  </section>;
}
