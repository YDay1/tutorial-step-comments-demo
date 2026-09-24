import { chapters } from './video-data.js';
const descriptions = {
  preview: '短片以莫言《生死疲劳》第一章为素材，呈现阎王审判、油锅炸人、换皮返归等情节，全程用AI工具完成。',
  script: '从莫言《生死疲劳》第一章提取两个情节，粘贴到ChatGPT或Codex中，输入「帮我把这个片段改写为75秒左右的剧本」，即可获得完整文字剧本。',
  shots: '在Codex中将剧本生成脚本并保存，并按照视频生成时长限制拆分镜头。',
  style: '选择中国画作为风格参考，并提取关键词用于后续生成。',
  assets: '根据脚本整理角色、场景与道具清单，使用Image2生成素材图。',
  characters: '根据角色设定生成角色图，统一人物外观与中国画风格。',
  elements: '将确认后的角色素材保存为元素，便于后续镜头复用。',
  scenes: '根据镜头需求生成场景图与道具图，保持整体风格一致。',
  generate: '将素材与镜头脚本组合，使用Seedance2生成AI短片。',
  voice: '根据人物与叙事情绪生成音色，为短片补充声音。',
};
// Curated mock associations, not generated answers or live model results.
// Count represents the historical group; this stage only includes two previews.
const discussionsByStep = {
  shots: {
    count: 12,
    previews: [
      { id: 'shots-1', author: '辰的学习记录', content: '我让 Codex 先限制成 15 个镜头，会好很多。', topicId: 'shot-count-control', association: { signals: ['step-context', 'comment-semantics'], confidence: 'high' } },
      { id: 'shots-2', author: '卷卷今天也没哭', content: '我感觉最好先控制故事长度，再拆镜头，不然会越拆越多。', topicId: 'shot-count-control', association: { signals: ['step-context', 'comment-semantics'], confidence: 'high' } },
    ],
  },
};
export const discussionAssociationMock = {
  mode: 'curated-mock',
  signals: ['step-context', 'comment-semantics'],
  similarQuestionsGroupedBy: 'topicId',
  lowConfidenceDestination: 'full-video-discussion',
  unassignedExamples: [{ id: 'unassigned-1', content: '这个工具在哪里用？', stepId: null, confidence: 'low', destination: 'full-video-discussion' }],
};
export const summary = {
  title: 'AI短片制作教程',
  intro: '这是一条用AI制作中国风短片的教程。以莫言《生死疲劳》为素材，',
  emphasis: '核心是九宫格生图法省积分，以及素模图重绘解决画质模糊。',
  sections: chapters.map(chapter => ({ ...chapter, description: descriptions[chapter.id], ...(discussionsByStep[chapter.id] ? { discussion: discussionsByStep[chapter.id] } : {}) })),
};
