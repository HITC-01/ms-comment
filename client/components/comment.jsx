import React from 'react';
import $ from 'jquery';
import ViewComments from './viewcomments.jsx';
import ArtistInfo from './artistInfo.jsx';
import Moment from 'moment';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            artistInfo: [],
            songInfo: [],
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.grabArtistInfo = this.grabArtistInfo.bind(this);
    this.grabSongInfo = this.grabSongInfo.bind(this);
    this.postSongTime = this.postSongTime.bind(this);
    }

    componentDidMount() {
        this.grabArtistInfo();
        this.grabSongInfo();
    }

    handleChange(event) {
        this.setState({text: event.target.value});
        console.log(this.state.text);
    }

    grabArtistInfo() {
        fetch(`/api/artist`, { method: 'GET' })
            .then(stream => stream.json())
            .then((res) => {
                const artistProfile = res;
                this.setState({artistInfo: artistProfile});
            });
    }

    grabSongInfo() {
        fetch('api/song', {method: 'GET'})
          .then(stream => stream.json())
          .then((res) => {
              const songProfile = res;
              this.setState({songInfo: songProfile});
          });
    }

    postSongTime(songtime) {
        return Math.floor(Math.random() * songtime);
    }

    handleSubmit(event) {
        event.preventDefault();
        var now = new Date();
        $.ajax('http://127.0.0.1:3003/api/sc/', {
            method: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify({
                text: this.state.text,
                createdAt: Moment(now).format('YYYY-MM-DD HH:mm:ss'),
                songtime: this.postSongTime(this.state.songInfo[0].songlength),
                artist_Id: this.state.artistInfo[0].artistId, 
                song_Id: this.state.songInfo[0].songId,
            }),
            success: () => {
                this.setState({text: ''});
            }
        });
    }

    render() {
        return (
            <div>
                <form className="wrapper" onSubmit={this.handleSubmit}>
                    <div className="commentInput">
                        {this.state.artistInfo.map(profile => 
                            <span className="profilePic" key="profile.artistId">
                            <img id="profilePic" src={profile.imageURL} width="40" height="40"></img>
                            </span>
                        )}
                        <span className="textbox"><input id="text" type="text" placeholder="Write a comment" value={this.state.text} onChange={this.handleChange} /></span>
                    </div>
                    <div className="createButtons">
                        <button className="form-buttons"><i className="fas fa-heart"></i>Like</button>
                        <button className="form-buttons"><i className="fas fa-retweet"></i></button>
                        <button className="form-buttons"><i className="fas fa-share-square"></i></button>
                        <button className="form-buttons"><i className="fas fa-ellipsis-h"></i></button>
                        <a id="buyIn" href="#"> Stream/Download </a>
                        
                        {this.state.songInfo.map(songProfile => 
                            <ul key="songProfile.id" className="soundStats">
                                <li className="miniStats"><span><i className="fas fa-play"></i>{songProfile.plays}</span></li>
                                <li className="miniStats"><span><i className="fas fa-heart"></i>{songProfile.likes}</span></li>
                                <li className="miniStats"><span><i className="fas fa-share-square"></i>{songProfile.reposts}</span></li>
                            </ul>
                        )}  
                    </div>  
                </form>
                <ArtistInfo />
               <ViewComments />
            </div>
        );
    }
}
