import React from 'react';
import $ from 'jquery';


export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Write a comment!',
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleFocus(event) {
        const newState = {text: ''};
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();
        $.ajax('/api/sc/:song/:comment', {
            method: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify({
                text: this.state.text,
                createdAt: Date.now(),
             

            }),
            success: (data) => {
                this.setState({text: 'Write a comment'});
            }
        });
    }

    render() {
        return (
            <div> 
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input id="text" value={this.state.text} onChange={this.handleChange} onFocus={this.handleFocus} />
                        <div>
                            <span><button>Like</button></span>
                            <span><button>Repost</button></span>
                            <span><button>Share</button></span>
                            <span><button>More</button></span>
                        </div>
                    </form>
                </div>
               
            </div>
        );
    }
}
