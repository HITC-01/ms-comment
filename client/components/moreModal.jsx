import React from 'react';
import propTypes from 'prop-types';
import commentCSS from './comment.css';

const MoreModal = (props) => {
  const { status } = props;
  const displayModal = !status ? commentCSS.comDisplayNone : commentCSS.Display;
  return (
    <div className={`${commentCSS.comModal} ${displayModal}`}>
      <div className={commentCSS.comModalSpan}>
        <button className={commentCSS.comModalButton} title="Add to Next up" type="button">
          <i className="far fa-play-circle" />
Add to Next up
        </button>
      </div>
      <div className={commentCSS.comModalSpan}>
        <button className={commentCSS.comModalButton} title="Add to Playlist" type="button">
          <i className="fab fa-soundcloud" />
          {' '}
Add to playlist
        </button>
      </div>
      <div className={commentCSS.comModalSpan}>
        <button className={commentCSS.comModalButton} title="Station" type="button">
          <i className="fas fa-broadcast-tower" />
Station
        </button>
      </div>
    </div>
  );
};

export default MoreModal;

MoreModal.propTypes = {
  status: propTypes.bool,
};

MoreModal.defaultProps = {
  status: 'com-displayNone',
};
