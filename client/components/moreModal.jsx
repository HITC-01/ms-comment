import React from 'react';

const MoreModal = (props) => {
  return (
  <div className={`com-modal ${props.status}`}>
      <div className="com-modalSpan">
        <button className="com-modal-button" title={`Add to Next up`}>
        <i className="far fa-play-circle"></i>Add to Next up
        </button>
      </div>
      <div className="com-modalSpan">
        <button className="com-modal-button" title={`Add to Playlist`}>
        <i className="fab fa-soundcloud"></i> Add to playlist
        </button>
      </div>
      <div className="com-modalSpan">
        <button className="com-modal-button" title={`Station`}>
        <i className="fas fa-broadcast-tower"></i>Station
        </button>
      </div>   
  </div>  
  )  
}

export default MoreModal;
