import React from 'react';
import propTypes from 'prop-types';
import commentCSS from './viewcomments.css';

const Reply = (props) => {
  const { status } = props;
  if (!status) {
    return (
      <div className={commentCSS.comDisplayNone} />
    );
  }
  return (
    <div className={commentCSS.comOptions}>
      <div className={commentCSS.comModalReply}>
        <button className={`${commentCSS.comModalCommentButton} ${commentCSS.replyButton}`} title="Reply" type="button">
          <i className="fas fa-arrow-left" />
          Reply
        </button>
      </div>
      <div className={commentCSS.comModalDelete}>
        <button className={commentCSS.comModalCommentButton} title="Delete this comment" type="button">
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  );
};

export default Reply;

Reply.propTypes = {
  status: propTypes.bool,
};

Reply.defaultProps = {
  status: false,
};
