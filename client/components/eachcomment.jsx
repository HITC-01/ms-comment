import React from 'react';
import propTypes from 'prop-types';
import Moment from 'moment';
import Reply from './reply.jsx';
import helpers from '../helpers/commentHelpers.js';

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
        className="com-eachComment"
        key={info.commentId}
        onMouseEnter={this.toggleOptions}
        onMouseLeave={this.toggleOptions}
      >
        <Reply status={showOptions} />
        <div className="com-timeAgo" title={`Posted On ${Moment(info.createdAt).format('MMMM do YYYY')}`}>
          {Moment(info.createdAt).fromNow()}
        </div>
        <div className="com-profilePic">
          <img className="com-artistPic" src={info.imageURL} alt={`${info.name}`} />
        </div>
        <div className="com-innerWrap">
          <div className="com-artistName">
            {info.name}
            {' '}
            <span style={{ color: '#ccc' }}>at</span>
            {' '}
            {helpers.convertTime(info.songtime)}
:
          </div>
          <div className="com-commentText">
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
