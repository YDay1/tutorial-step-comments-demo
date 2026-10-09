import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import TimestampCommentChip from './TimestampCommentChip.jsx';
import CommentTools from './CommentTools.jsx';
import IOSKeyboard from './IOSKeyboard.jsx';
import CommentSticker from './CommentSticker.jsx';
import { commentStickers } from '../data/comment-stickers.js';
import { createCommentFragment, readCommentText } from '../comment-sticker-text.js';
import CommentAttachmentPanel from './CommentAttachmentPanel.jsx';
import CommentTimestampPicker from './CommentTimestampPicker.jsx';
import '../comment-attachments.css';

export default function CommentComposer({ active, context, text, onTextChange, onRemoveContext, onContextChange, onSend, onDismiss }) {
  const inputRef = useRef(null);
  const [mounted, setMounted] = useState(active);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [accessoryMode, setAccessoryMode] = useState('keyboard');
  const [pickerOpen, setPickerOpen] = useState(false);
  const surfaceRef = useRef(null);
  const previousSurfaceRef = useRef(null);
  useEffect(() => {
    let firstFrame, secondFrame, exitTimer;
    if (active) {
      setAccessoryMode('keyboard');
      setMounted(true);
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          setKeyboardOpen(true);
        });
      });
    } else {
      setPickerOpen(false);
      setKeyboardOpen(false);
      inputRef.current?.blur();
      exitTimer = setTimeout(() => setMounted(false), 340);
    }
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      clearTimeout(exitTimer);
    };
  }, [active]);
  useEffect(() => {
    if (inputRef.current && readCommentText(inputRef.current) !== text) inputRef.current.replaceChildren(createCommentFragment(text));
  }, [text, mounted]);
  useEffect(() => {
    if (!active || !keyboardOpen || !mounted || pickerOpen || accessoryMode !== 'keyboard') return;
    // Focus after the visible surface has committed, including a reopened draft.
    const frame = requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [active, keyboardOpen, mounted, accessoryMode, pickerOpen]);

  function switchAccessory(mode) {
    if (mode === accessoryMode) return;
    previousSurfaceRef.current = surfaceRef.current?.getBoundingClientRect();
    setAccessoryMode(mode);
    if (mode === 'attachments') inputRef.current?.blur();
  }
  useLayoutEffect(() => {
    const previous = previousSurfaceRef.current;
    previousSurfaceRef.current = null;
    if (!previous || !surfaceRef.current || !active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const current = surfaceRef.current.getBoundingClientRect();
    const animation = surfaceRef.current.animate([{ transform: `translateY(${previous.y - current.y}px)` }, { transform: 'translateY(0)' }], { duration: 240, easing: 'cubic-bezier(.2, .8, .2, 1)' });
    return () => animation.cancel();
  }, [accessoryMode, active]);

  function closeTimePicker() {
    setPickerOpen(false);
    requestAnimationFrame(() => surfaceRef.current?.querySelector('.comment-attachment-option[type="button"]')?.focus({ preventScroll: true }));
  }

  useEffect(() => {
    if (!active || !keyboardOpen || pickerOpen) return;
    const phone = inputRef.current?.closest('.phone');
    if (!phone) return;
    function dismissOutsideInput(event) {
      if (event.target.closest('.comment-composer, .comment-ios-keyboard, .comment-attachment-panel, .comment-close')) return;
      onDismiss();
    }
    // The video is inert while comments are open; its taps still reach the phone.
    phone.addEventListener('pointerdown', dismissOutsideInput);
    return () => phone.removeEventListener('pointerdown', dismissOutsideInput);
  }, [active, keyboardOpen, pickerOpen, onDismiss]);

  function editFromKeyboard(value, deleting = false) {
    const editor = inputRef.current;
    if (!editor) return;
    editor.focus({ preventScroll: true });
    const selection = window.getSelection();
    let range = selection.rangeCount ? selection.getRangeAt(0) : null;
    if (!range || !editor.contains(range.commonAncestorContainer)) {
      range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    if (deleting && range.collapsed) {
      const original = range.cloneRange();
      // Character granularity also handles emoji surrogate pairs.
      selection.modify('extend', 'backward', 'character');
      range = selection.getRangeAt(0);
      if (!editor.contains(range.commonAncestorContainer)) {
        selection.removeAllRanges();
        selection.addRange(original);
        return;
      }
    }
    range.deleteContents();
    if (!deleting) {
      const fragment = createCommentFragment(value);
      const last = fragment.lastChild;
      if (last) { range.insertNode(fragment); range.setStartAfter(last); }
    }
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    onTextChange(readCommentText(editor));
    editor.parentElement.scrollTop = editor.parentElement.scrollHeight;
  }

  if (!mounted) return null;
  return <div className={`comment-compose-dock ${active ? 'is-active' : ''} ${keyboardOpen ? 'keyboard-open' : ''} ${accessoryMode === 'attachments' ? 'attachments-open' : ''}`} inert={!active ? true : undefined}>
    <div className="comment-composer-scrim" aria-hidden="true" />
    <div className="comment-compose-surface" ref={surfaceRef} inert={pickerOpen ? true : undefined}>
    <form className="comment-composer" onSubmit={event => { event.preventDefault(); onSend(); }} aria-label="发表评论">
      <div className="comment-compose-field">
        {context && <TimestampCommentChip context={context} onRemove={onRemoveContext} />}
        <div ref={inputRef} className="comment-compose-text" contentEditable="true" inputMode="none" suppressContentEditableWarning
          role="textbox" aria-multiline="true" aria-label="评论内容" data-placeholder="说点什么…" data-empty={!text}
          data-gramm="false" data-gramm_editor="false" spellCheck={false}
          onClick={() => { switchAccessory('keyboard'); setKeyboardOpen(true); }} onInput={event => onTextChange(readCommentText(event.currentTarget))}
          onPaste={event => { event.preventDefault(); editFromKeyboard(event.clipboardData.getData('text/plain')); }}
          onCopy={event => {
            const selection = window.getSelection();
            if (!selection.rangeCount || selection.isCollapsed) return;
            const content = document.createElement('div');
            content.append(selection.getRangeAt(0).cloneContents());
            event.preventDefault();
            event.clipboardData.setData('text/plain', readCommentText(content));
          }} />
      </div>
      <div className="comment-compose-actions"><CommentTools expanded={accessoryMode === 'attachments'} onToggleAttachments={() => switchAccessory(accessoryMode === 'keyboard' ? 'attachments' : 'keyboard')} /><button className="comment-send" type="submit" disabled={!text.trim()}>发送</button></div>
      {accessoryMode === 'keyboard' && <div className="comment-stickers" aria-label="快捷表情" onPointerDown={event => event.preventDefault()}>{commentStickers.map(sticker => <button type="button" key={sticker.id} aria-label={`插入 ${sticker.emoji}`} onClick={() => editFromKeyboard(sticker.token)}><CommentSticker sticker={sticker} /></button>)}</div>}
    </form>
    {accessoryMode === 'keyboard' ? <IOSKeyboard open={keyboardOpen} onInsert={editFromKeyboard} onDelete={() => editFromKeyboard('', true)} onDismiss={onDismiss} onSend={onSend} canSend={!!text.trim()} /> : <CommentAttachmentPanel onTimestamp={() => setPickerOpen(true)} />}
    </div>
    {pickerOpen && <CommentTimestampPicker context={context} onClose={closeTimePicker} onConfirm={next => { onContextChange(next); setPickerOpen(false); switchAccessory('keyboard'); }} />}
  </div>;
}
