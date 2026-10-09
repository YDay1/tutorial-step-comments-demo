import CommentSticker from './CommentSticker.jsx';
import { splitCommentText } from '../comment-sticker-text.js';

export default function CommentText({ text }) {
  return splitCommentText(text).map((part, index) => typeof part === 'string'
    ? part : <CommentSticker key={index} sticker={part} inline />);
}
