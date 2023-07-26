import './styles.css';
import { Component } from 'react';
import { PropTypes } from 'prop-types';
export class LoadMorePosts extends Component {
  render() {
    const { text, loadMorePosts, disabled } = this.props;
    return (
      <div className="laodMorePosts__button__wrapper">
        <button disabled={disabled} className="loadMorePosts__button" onClick={loadMorePosts}>
          {text}
        </button>
      </div>
    );
  }
}

LoadMorePosts.defaultProps = {
  disabled: false,
};
LoadMorePosts.propTypes = {
  text: PropTypes.string.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
