import React from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import EachComment from './eachcomment.jsx';

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
            showOptions: false,
        }
        this.fetchComments = this.fetchComments.bind(this);
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
                    <EachComment info={comment} />
                    </div>
                  )}
                </div>
                <div className="com-bottom-border"></div>
            </div>
        );
    }
}

ViewComments.propTypes = {
    songId: propTypes.number,
    commentList: propTypes.array,
};

ViewComments.defaultProps = {
    commentList: [],
};