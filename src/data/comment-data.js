import avatar from '../assets/future.jpg';
import designer from '../assets/designer.jpg';
export const defaultCommentContext = { timestamp: '2:03', step: '剧本转脚本' };
export const commentUser = { name: '我的学习记录', avatar };
export const initialComments = [
  { id: 'mock-1', author: '辰的学习记录', avatar, text: '我想用 DeepSeek 和豆包平替一下，生成角色这步就卡住了', context: null, meta: '08-30 上海', likes: 3, replies: 2 },
  { id: 'mock-2', author: '卷卷今天也没哭', avatar: designer, text: '就是费钱和每次抽卡不稳定，难呀！', context: null, meta: '08-18 云南', likes: 5, replies: 1 },
  { id: 'mock-3', author: '猫猫', avatar, text: '没了解过，求个介绍🍑', context: null, meta: '08-12 江西', likes: 4, replies: 2 },
];
