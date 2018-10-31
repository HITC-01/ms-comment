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
        let random = Math.floor(Math.random() * 10) + 1;
        this.fetchComments(random);
    }
    fetchComments(songId) {
        $.ajax(`/api/sc/songs/${songId}/`, {
            success: (data) => {
                this.setState({commentList: data});
            }
        })
    }
    
    convertTime(totalSeconds) {
        const minutes = `${Math.floor(totalSeconds / 60)}`;
        let seconds = `${totalSeconds - minutes * 60}`;
        if (seconds.length === 1) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
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
                        <div className="timeAgo">{Moment(comment.createdAt).fromNow()}</div>

                         <div className="profilePic"><img className="artistPic" src= {comment.imageURL}></img></div>
                         <div className="innerWrap">
                            <div className="artistName">{comment.name} at {this.convertTime(comment.songtime)}:</div>

                            <div className="commentText">{ comment.text }</div>
                        </div>
                    </li>
                  </div>
                  )}
                </div>
            </div>
        );
    }
}