import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div class='post post-about p-1 my-1'>
      <div className='img-top'>
        <Link to={`/profile/${user}`} className='user-name'>
          <img
            class='round-img'
            src={
              avatar ||
              'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
            }
            alt=''
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <div className='item-btns'>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deleteComment(postId, _id)}
              type='button'
              class='btn2 first'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
