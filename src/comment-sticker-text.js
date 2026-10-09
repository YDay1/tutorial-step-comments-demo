import { commentStickers } from './data/comment-stickers.js';

const byId = new Map(commentStickers.map(sticker => [sticker.id, sticker]));

export function splitCommentText(text) {
  return text.split(/(\[薯表情:[a-z]+\])/g).filter(Boolean).map(part => {
    const sticker = byId.get(part.match(/^\[薯表情:([a-z]+)\]$/)?.[1]);
    return sticker || part;
  });
}

export function readCommentText(editor) {
  function read(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
    const sticker = byId.get(node.dataset?.commentSticker);
    if (sticker) return sticker.token;
    // Chromium leaves a terminal BR to place the caret after an inline item.
    if (node.nodeName === 'BR') return node.nextSibling ? '\n' : '';
    if (node.childNodes.length === 1 && node.firstChild.nodeName === 'BR') return '';
    return [...node.childNodes].map((child, index) => {
      const separator = index > 0 && /^(DIV|P)$/.test(child.nodeName) ? '\n' : '';
      return separator + read(child);
    }).join('');
  }
  return read(editor);
}

export function createCommentFragment(text) {
  const fragment = document.createDocumentFragment();
  for (const part of splitCommentText(text)) {
    if (typeof part === 'string') fragment.append(document.createTextNode(part));
    else {
      const element = document.createElement('span');
      element.className = `comment-sticker-art comment-sticker-${part.index} comment-sticker-inline`;
      element.contentEditable = 'false';
      element.dataset.commentSticker = part.id;
      element.setAttribute('role', 'img');
      element.setAttribute('aria-label', part.label);
      element.textContent = part.token;
      fragment.append(element);
    }
  }
  return fragment;
}
