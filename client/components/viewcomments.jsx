import React from 'react';
import $ from 'jquery';
import EachComment from './eachcomment.jsx';

const parse = (pathname) => {
  const splitString = pathname.split('/');
  return splitString[2];
};

const songId = parse(window.location.pathname);

export default class ViewComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
    };
    this.fetchComments = this.fetchComments.bind(this);
  }

  componentDidMount() {
    this.fetchComments(songId);
    this.interval = setInterval(() => this.fetchComments(songId), 1000);
  }

  fetchComments() {
    $.ajax(`/api/sc/songs/${songId}/`, {
      success: (data) => {
        let { commentList } = this.state;
        commentList = data;
        this.setState({ commentList });
      },
    });
  }

  render() {
    const { commentList } = this.state;
    return (
      <div className="container">
        <div className="com-totalCommentsCount">
          <span className="com-commentsIcon">
            <i className="fas fa-comment" />
          </span>
          <span>
            {commentList.length}
            {' '}
            {(commentList.length !== 1 ? 'Comments' : 'Comment')}
          </span>
        </div>
        <div className="com-allComments">
          {commentList.map(comment => (
            <div key={comment.commentId} className="com-commentContainer">
              <EachComment info={comment} />
            </div>
          ))}
        </div>
        <div className="com-bottom-border" />
      </div>
    );
  }
}

ViewComments.defaultProps = {
  commentList: [],
};
