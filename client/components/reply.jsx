import React from 'react';
import propTypes from 'prop-types';

const Reply = (props) => {
  const { status } = props;
  if (!status) {
    return (
      <div className="com-displayNone" />
    );
  }
  return (
    <div className="com-options">
      <div className="com-modalReply">
        <button className="com-modal-commentButton replyButton" title="Reply" type="button">
          <i className="fas fa-arrow-left" />
          Reply
        </button>
      </div>
      <div className="com-modalDelete">
        <button className="com-modal-commentButton" title="Delete this comment" type="button">
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
