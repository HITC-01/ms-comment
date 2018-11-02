import React from 'react';
import $ from 'jquery';
import Moment from 'moment';
import Numeral from 'numeral';
import propTypes from 'prop-types';
import MoreModal from './moreModal.jsx';

let parse = (pathname) => {
	var splitString = pathname.split('/');
	return splitString[2];
};
let songId = parse(window.location.pathname);

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            artistInfo: [],
            songInfo: [
                {songId: ''},
            ],
            show: false,
            like: false,
            repost: false,
            share: false,
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.grabArtistInfo = this.grabArtistInfo.bind(this);
    this.grabSongInfo = this.grabSongInfo.bind(this);
    this.postSongTime = this.postSongTime.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleRepost = this.toggleRepost.bind(this);
    this.toggleShare = this.toggleShare.bind(this);
    }

    toggleLike() {
        const { like } = this.state;
        this.setState({like: !like});
    }

    toggleRepost() {
        const { repost } = this.state;
        this.setState({repost: !repost});
    }

    toggleShare() {
        const { share } = this.state;
        this.setState({share: !share});
    }

    toggleModal() {
        const { show } = this.state;
        this.setState({show: !show});
    }

    componentDidMount() {
        let random = Math.floor(Math.random() * 150) + 1;
        this.grabArtistInfo(random);
        this.grabSongInfo(songId);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    grabArtistInfo(artistId) {
        fetch(`/api/artist/${artistId}/`, { method: 'GET' })
            .then(stream => stream.json())
            .then((res) => {
                const artistProfile = res;
                this.setState({artistInfo: artistProfile});
            });
    }

    grabSongInfo(songId) {
        fetch(`/api/song/${songId}`, { method: 'GET' })
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
        $.ajax('/api/sc/', {
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
        const likeStatus = this.state.like ? 'Liked' : 'Like';
        const repostStatus = this.state.repost ? 'Reposted' : 'Repost';
        const shareStatus = this.state.share ? 'Shared' : 'Share';
        const modalStatus = this.state.show ? 'com-display' : 'com-displayNone';

        return (
            <div>
                <form className="wrapper" autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="com-commentInput">
                        {this.state.artistInfo.map(profile => 
                            <span className="com-profilePic" key="profile.artistId" title={`${profile.name}`}>
                                <img id="profilePic" src={profile.imageURL} width="40" height="40">
                                </img>
                            </span>
                        )}
                            <span className="com-textbox" title={`Write a comment`}>
                                <input id="text" type="text" placeholder="Write a comment" value={this.state.text} onChange={this.handleChange} />
                            </span>
                    </div>
                </form>    
                    <div className="com-createButtons">
                        <button className={`com-button com-${this.state.like}`} title={`Like`} onClick={this.toggleLike}>
                            <i className="fas fa-heart"></i>{likeStatus}</button>
                        <button className={`com-button com-${this.state.repost}`} title={`Repost`} onClick={this.toggleRepost}>
                            <i className="fas fa-retweet"></i>{repostStatus}</button>
                        <button className={`com-button com-${this.state.share}`} title={`Share`} onClick={this.toggleShare}>
                            <i className="fas fa-share-square"></i>{shareStatus}</button>
                        <button className={`com-button com-${this.state.show}`} title={`More Options`} onClick={this.toggleModal}>
                            <i className="fas fa-ellipsis-h"></i>More
                        </button>
                        <MoreModal status={modalStatus}/>
                        <a id="buyIn" href="#" title={`Click to buy or stream`}> 
                        Stream/Download 
                        </a>
                        
                        {this.state.songInfo.map(songProfile => 
                            <ul key="songProfile.id" className="soundStats">
                                <li className="miniStats-Static" title={`${songProfile.plays} plays`}>
                                    <span>
                                        <i className="fas fa-play"></i>
                                        {Numeral(songProfile.plays).format('0.0a')}
                                    </span>
                                </li>
                                <li className="com-miniStats" title={`${songProfile.likes} likes`}>
                                    <span>
                                        <i className="fas fa-heart"></i>
                                        {Numeral(songProfile.likes).format('0.0a')}
                                    </span>
                                </li>
                                <li className="com-miniStats" title={`${songProfile.reposts} reposts`}>
                                <span>
                                    <i className="fas fa-share-square"></i>
                                    {Numeral(songProfile.reposts).format('0.00a')}
                                    </span>
                                </li>
                            </ul>
                        )}
                        <div className="com-border"></div>  
                    </div>  
            </div>
        );
    }
}

Comment.propTypes = {
    text: propTypes.string,
    songId: propTypes.number,
    artistInfo: propTypes.array,
    songInfo: propTypes.array,
    show: propTypes.bool,
    like: propTypes.bool,
    repost: propTypes.bool,
    share: propTypes.bool,
};

Comment.defaultProps = {
    text: '',
    artistInfo: [],
    songInfo: [],
    show: false,
    like: false,
    repost: false,
    share: false,
};