export const commentStickers = [
  { id: 'cry', emoji: '😭', label: '大哭' },
  { id: 'plead', emoji: '🥺', label: '可怜' },
  { id: 'shy', emoji: '😠', label: '捂脸' },
  { id: 'laugh', emoji: '😂', label: '笑哭' },
  { id: 'sob', emoji: '😩', label: '哭喊' },
  { id: 'smile', emoji: '🙂', label: '微笑' },
  { id: 'kiss', emoji: '😘', label: '亲亲' },
  { id: 'playful', emoji: '😝', label: '调皮' },
].map((sticker, index) => ({ ...sticker, index, token: `[薯表情:${sticker.id}]` }));
