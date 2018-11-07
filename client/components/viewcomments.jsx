import React from 'react';
import $ from 'jquery';
import EachComment from './eachcomment.jsx';
import commentCSS from './viewcomments.css';

const parse = (pathname) => {
  const splitString = pathname.split('/');
  return splitString[2];
};

const songId = parse(window.location.pathname);

export default class ViewComments extends React.Component {
  constructor(props) {
    super(props);
    this.songId = props.songId;
    this.state = {
      commentList: [],
    };
    this.fetchComments = this.fetchComments.bind(this);
  }

  componentDidMount() {
    this.fetchComments(this.songId);
    this.interval = setInterval(() => this.fetchComments(this.songId), 1000);
  }

  fetchComments() {
    $.ajax(`/comment/songs/${this.songId}`, {
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
      <div className={commentCSS.container}>
        <div className={commentCSS.comTotalCommentsCount}>
          <span className={commentCSS.comCommentsIcon}>
            <i className="fas fa-comment" />
          </span>
          <span>
            {commentList.length}
            {' '}
            {(commentList.length !== 1 ? 'Comments' : 'Comment')}
          </span>
        </div>
        <div className={commentCSS.comAllComments}>
          {commentList.map(comment => (
            <div key={comment.commentId} className={commentCSS.comCommentContainer}>
              <EachComment info={comment} />
            </div>
          ))}
        </div>
        <div className={commentCSS.comBottomBorder} />
      </div>
    );
  }
}

ViewComments.defaultProps = {
  commentList: [],
  songId: 1,
};
