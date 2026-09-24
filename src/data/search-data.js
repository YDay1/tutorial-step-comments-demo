import tutorial from '../assets/tutorial-cover.jpg';
import animation from '../assets/animation-cover.jpg';
import food from '../assets/food-cover.jpg';
import skill from '../assets/skill-cover.jpg';
import red from '../assets/red-cover.jpg';
import author from '../assets/author.jpg';
import designer from '../assets/designer.jpg';
import future from '../assets/future.jpg';
export const categories = ['全部', '用户', '商品', '图片', '视频'];
export const feedColumns = [
  [
    { id: 'ai-short-film', cover: tutorial, title: '用Image2和sd2做短片～视频教程 #AIGC #AI新工具', author: '阿进的 studio', avatar: author, date: '09-03', likes: '6502', interactive: true },
    { id: 'food', cover: food, title: '老友家宴 | 食材满分发挥，厨艺勉强及格 我和 @ 土豆', author: '吕严严肃的严', avatar: author, date: '09-15', likes: '3.3万' },
  ],
  [
    { id: 'animation', cover: animation, title: 'Image2生成动画短片教程来了！ AI动画实操教程', author: 'AIGC设计师', avatar: designer, date: '08-06', likes: '4364' },
    { id: 'skill', cover: skill, title: '用了这个skill，我的动画丝滑的像——！ #Skill #Git', author: '未来奇点', avatar: future, date: '08-06', likes: '1978' },
    { id: 'more', cover: red, title: '用 Image2 做 AI 短片（视频教程）', author: 'AI创作笔记', avatar: designer, date: '09-12', likes: '2810' },
  ],
];
