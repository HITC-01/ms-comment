import React from 'react';
import propTypes from 'prop-types';
import Moment from 'moment';
import Reply from './reply.jsx';
import helpers from '../helpers/commentHelpers.js';
import commentCSS from './viewcomments.css';

export default class EachComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };
    this.toggleOptions = this.toggleOptions.bind(this);
  }

  toggleOptions() {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  }

  render() {
    const { showOptions } = this.state;
    const { info } = this.props;
    return (
      <li
        className={`${commentCSS.comEachComment} ${commentCSS.li}`}
        key={info.commentId}
        onMouseEnter={this.toggleOptions}
        onMouseLeave={this.toggleOptions}
      >
        <Reply status={showOptions} />
        <div className={commentCSS.comTimeAgo} title={`Posted On ${Moment(info.createdAt).format('MMMM do YYYY')}`}>
          {Moment(info.createdAt).fromNow()}
        </div>
        <div className={commentCSS.comProfilePic}>
          <img className={commentCSS.comArtistPic} src={info.imageURL} alt={`${info.name}`} />
        </div>
        <div className={commentCSS.comInnerWrap}>
          <div className={commentCSS.comArtistName}>
            {info.name}
            {' '}
            <span style={{ color: '#ccc' }}>at</span>
            {' '}
            {helpers.convertTime(info.songtime)}
:
          </div>
          <div className={commentCSS.comCommentText}>
            {info.text}
          </div>
        </div>
      </li>
    );
  }
}

EachComment.propTypes = {
  info: propTypes.instanceOf(Object),
};

EachComment.defaultProps = {
  info: [],
};
