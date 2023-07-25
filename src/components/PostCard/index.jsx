import './styles.css'

export const PostCard = ({ cover, title, body, id}) => {
  return (
    <div className="post">
      <img className="postImg" src={cover} alt={title} />
      <div className="post-content">
        <h2>{title} {id}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
};
