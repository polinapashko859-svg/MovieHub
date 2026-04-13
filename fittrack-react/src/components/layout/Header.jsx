const Header = ({ title, onSearch }) => (
  <header className="header">
    <div className="header__container">
      <div className="header__brand">
        <h1 className="header__title">{title}</h1>
      </div>
      <div className="header__search">
        <input 
          type="text" 
          placeholder="Поиск упражнений..." 
          className="header__search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  </header>
);
export default Header;