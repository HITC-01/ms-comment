import React from 'react';
import Reply from './reply.jsx';
import propTypes from 'prop-types';
import Moment from 'moment';

export default class EachComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: false,
        }
        this.convertTime = this.convertTime.bind(this);
        this.toggleOptions = this.toggleOptions.bind(this);
    }

    toggleOptions() {
        const { showOptions } = this.state;
        this.setState({showOptions: !showOptions}); 
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
        const { showOptions } = this.state;
        return (
                <li 
                  className="com-eachComment" 
                  key={comment.commentId} 
                  onMouseEnter={this.toggleOptions} 
                  onMouseLeave={this.toggleOptions}
                >
                    <Reply status={showOptions}/>
                    <div className="com-timeAgo" title={`Posted On ${Moment(this.props.info.createdAt).format('MMMM do YYYY')}`}>
                    {Moment(this.props.info.createdAt).fromNow()}
                    </div>
                        <div className="com-profilePic">
                        <img className="com-artistPic" src= {this.props.info.imageURL}>
                        </img>
                    </div>
                    <div className="com-innerWrap">
                        <div className="com-artistName">
                            {this.props.info.name} <span style={{color:'#ccc'}}>at</span> {this.convertTime(this.props.info.songtime)}:
                        </div>
                        <div className="com-commentText">{this.props.info.text}
                        </div>
                    </div>
                </li>
        );
    }
}

EachComment.propTypes = {
    showOptions: propTypes.bool,
    convertTime: propTypes.func,
};

EachComment.defaultProps = {
    showOptions: false,
};