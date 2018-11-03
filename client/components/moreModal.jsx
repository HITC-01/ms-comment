import React from 'react';
import propTypes from 'prop-types';

const MoreModal = props => (
  <div className={`com-modal ${props.status}`}>
    <div className="com-modalSpan">
      <button className="com-modal-button" title="Add to Next up" type="button">
        <i className="far fa-play-circle" />
Add to Next up
      </button>
    </div>
    <div className="com-modalSpan">
      <button className="com-modal-button" title="Add to Playlist" type="button">
        <i className="fab fa-soundcloud" />
        {' '}
Add to playlist
      </button>
    </div>
    <div className="com-modalSpan">
      <button className="com-modal-button" title="Station" type="button">
        <i className="fas fa-broadcast-tower" />
Station
      </button>
    </div>
  </div>
);

export default MoreModal;

MoreModal.propTypes = {
  status: propTypes.string,
};

MoreModal.defaultProps = {
  status: 'com-displayNone',
};
