const Card = ({ title, children, className = '', image }) => (
  <article className={`card ${className}`}>
    {image && <img src={image} alt={title} className="card__image" />}
    <div className="card__content">
      <h3 className="card__title">{title}</h3>
      {children}
    </div>
  </article>
);
export default Card;