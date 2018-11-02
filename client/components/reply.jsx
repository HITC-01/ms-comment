import React from 'react';

const Reply = (props) => {
    if ( !props.status) {
        return (
            <div className="com-displayNone">'Hey'</div>
        )
    } else {
        return (
            <div className={`com-options`}>
                <div className="com-modalReply">
                    <button className="com-modal-commentButton replyButton" title={`Reply`}>
                    <i className="fas fa-arrow-left"></i>Reply
                    </button>
                </div>
                <div className="com-modalDelete">
                    <button className="com-modal-commentButton" title={`Delete this comment`}>
                    <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>  
        )  
    }
}

export default Reply;
