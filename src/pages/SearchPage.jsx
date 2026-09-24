import StatusBar from '../components/StatusBar.jsx';
import SearchHeader from '../components/SearchHeader.jsx';
import FeedCard from '../components/FeedCard.jsx';
import Icon from '../components/Icon.jsx';
import { categories, feedColumns } from '../data/search-data.js';
export default function SearchPage({ onOpenVideo }) {
  return <section className="search-page" aria-label="搜索结果页"><StatusBar /><SearchHeader /><nav className="category-tabs" aria-label="搜索分类">{categories.map((tab, index) => <span key={tab} className={index === 0 ? 'active' : ''}>{tab}{index === 0 && <Icon name="menu" size={15} />}</span>)}<span className="ask-diandian"><i className="mint-mark" />问点点</span></nav><div className="feed-scroll"><div className="feed-grid">{feedColumns.map((column, index) => <div className="feed-column" key={index}>{column.map(item => <FeedCard key={item.id} item={item} onOpen={onOpenVideo} />)}</div>)}</div></div></section>;
}
