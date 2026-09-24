import Icon from './Icon.jsx';
export default function SearchHeader({ dark = false, onBack }) {
  return <header className={`search-header ${dark ? 'search-header-dark' : ''}`}>
    <button className="icon-button back-button" onClick={onBack} disabled={!onBack} aria-label="返回搜索结果"><Icon name="back" size={26} /></button>
    <div className="search-box">{dark && <Icon name="search" size={19} />}<span className="search-query">教程视频</span>{!dark && <span className="clear-search" aria-hidden="true">×</span>}<span className="search-submit">搜索</span></div>
    {dark && <span className="share-icon" aria-label="分享（静态展示）"><Icon name="share" size={25} /></span>}
  </header>;
}
