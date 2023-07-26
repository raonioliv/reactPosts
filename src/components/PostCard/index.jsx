import './styles.css';
import { PropTypes } from 'prop-types';
export const PostCard = ({ cover, title, body, id }) => {
  return (
    <div className="post">
      <img className="postImg" src={cover} alt={title} />
      <div className="post-content">
        <h2>
          {title} {id}
        </h2>
        <p>{body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
