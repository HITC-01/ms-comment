import React from 'react';
import $ from 'jquery';
import Moment from 'moment';


export default class ViewComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: [],
        }
        this.fetchComments = this.fetchComments.bind(this);
        this.convertTime = this.convertTime.bind(this);
    }
    componentDidMount() {
        this.fetchComments();
    }
    fetchComments() {
        $.ajax('/api/comments', {
            success: (data) => {
                this.setState({commentList: data});
            }
        })
    }
    
    convertTime(totalSeconds) {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds - minutes * 60;
        let commentTime = `${String(minutes)}:${String(seconds)}`;

        return commentTime;
    }

    render() {
        return(
            <div className="container">
                <div className="totalCommentsCount">
                    <span className="commentsIcon"><i className="fas fa-comment"></i> {''}</span>
                    <span>{this.state.commentList.length} {''}
                    {(this.state.commentList.length !== 1 ? 'Comments' : 'Comment')} </span>
                </div>
                <div className="allComments">
                  {this.state.commentList.map(comment => 
                  <div key={comment.commentId} className="commentContainer"> 
                    <li className="eachComment" key={comment.commentId}>
                        
                        <span className="artistName"> <span><img className="artistPic" src={comment.imageURL} width="50" height="50"></img></span>{comment.name} at {this.convertTime(comment.songtime)}:</span>
                        <span className="timeAgo">{ Moment(comment.createdAt).fromNow()}</span><br />
                        <div><span className="commentText">{ comment.text }</span></div><br />
                    </li>
                  </div>
                  )}
                </div>
            </div>
        );
    }
}