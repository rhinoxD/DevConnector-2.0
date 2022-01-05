import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div class='post post-about p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`} className='user-name'>
          <img class='round-img' src={
          avatar ||
          'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
        } alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <div className='item-btns'>
            <div className='like-dislike'>
            <button
              onClick={(e) => addLike(_id)}
              type='button'
              class='btn-like btn-purple purple'
            >
              <i class='fas fa-thumbs-up'></i>{'  '}
              {likes.length > 0 && (
                <span class='comment-count'>{likes.length}</span>
              )}
            </button>
            <button
              onClick={(e) => removeLike(_id)}
              type='button'
              class='btn-dislike btn-orange orange'
            >
              <i class='fas fa-thumbs-down'></i>
            </button>
            </div>
            <Link to={`/posts/${_id}`} className='button3 wobble-horizontal'>
              Discussion{' '}
              {comments.length > 0 && (
                <span class='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type='button'
                class='btn2 first'
              >
                <i class='fas fa-times'></i>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
