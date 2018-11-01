import React from 'react';
import $ from 'jquery';
import Moment from 'moment';


let parse = (pathname) => {
	var splitString = pathname.split('/');
	return splitString[2];
};

let songId = parse(window.location.pathname);

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
        this.fetchComments(songId);

        this.interval = setInterval(() => this.fetchComments(songId), 1000);
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
                <div className="com-totalCommentsCount">
                    <span className="com-commentsIcon">
                        <i className="fas fa-comment"></i> 
                    </span>
                    <span>
                        {this.state.commentList.length} {''}
                        {(this.state.commentList.length !== 1 ? 'Comments' : 'Comment')} 
                    </span>
                </div>
                <div className="com-allComments">
                  {this.state.commentList.map(comment => 
                    <div key={comment.commentId} className="com-commentContainer"> 
                    <li className="com-eachComment" key={comment.commentId}>
                        <div className="com-timeAgo" title={`Posted On ${Moment(comment.createdAt).format('MMMM do YYYY')}`}>
                        {Moment(comment.createdAt).fromNow()}
                        </div>
                         <div className="com-profilePic">
                           <img className="com-artistPic" src= {comment.imageURL}>
                           </img>
                        </div>
                        <div className="com-innerWrap">
                            <div className="com-artistName">
                              {comment.name} <span style={{color:'#ccc'}}>at</span> {this.convertTime(comment.songtime)}:
                            </div>
                            <div className="com-commentText">{comment.text}
                            </div>
                        </div>
                    </li>
                  </div>
                  )}
                </div>
            </div>
        );
    }
}