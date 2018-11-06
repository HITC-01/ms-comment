import React from 'react';
import $ from 'jquery';
import Moment from 'moment';
import Numeral from 'numeral';
import MoreModal from './moreModal.jsx';
import helpers from '../helpers/commentHelpers.js';

const parse = (pathname) => {
  const splitString = pathname.split('/');
  return splitString[2];
};

const songId = parse(window.location.pathname);

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    console.log('incoming', props.songId);
    this.state = {
      commentText: '',
      artistInfo: [],
      songInfo: [
        { songId: props.songId },
      ],
      show: false,
      like: false,
      repost: false,
      share: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.grabArtistInfo = this.grabArtistInfo.bind(this);
    this.grabSongInfo = this.grabSongInfo.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleRepost = this.toggleRepost.bind(this);
    this.toggleShare = this.toggleShare.bind(this);
  }

  componentDidMount() {
    const random = Math.floor(Math.random() * 150) + 1;
    this.grabArtistInfo(random)
      .then(() => {
        const { songInfo } = this.state;
        this.grabSongInfo(songInfo.songId);
      }).catch((error) => {
        console.log('Error', error);
      });
  }

  toggleLike() {
    const { like } = this.state;
    this.setState({ like: !like });
  }

  toggleRepost() {
    const { repost } = this.state;
    this.setState({ repost: !repost });
  }

  toggleShare() {
    const { share } = this.state;
    this.setState({ share: !share });
  }

  toggleModal() {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  handleChange(event) {
    this.setState({ commentText: event.target.value });
  }

  grabArtistInfo(artistId) {
    const url = `http://localhost:3003/api/artist/${artistId}/`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const artistProfile = res;
        this.setState({ artistInfo: artistProfile });
      });
  }

  grabSongInfo() {
    const { songInfo } = this.state;
    console.log(songInfo[0].songId);
    const url = `http://localhost:3003/api/song/${songInfo[0].songId}/`;
    fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const songProfile = res;
        this.setState({ songInfo: songProfile });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const now = new Date();
    const { commentText, songInfo, artistInfo } = this.state;

    $.ajax('/api/sc/', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        text: commentText,
        createdAt: Moment(now).format('YYYY-MM-DD HH:mm:ss'),
        songtime: helpers.postSongTime(songInfo[0].songlength),
        artist_Id: artistInfo[0].artistId,
        song_Id: songInfo[0].songId,
      }),
      success: () => {
        this.setState({ commentText: '' });
      },
    });
  }

  render() {
    const {
      like, repost, share, show, artistInfo, commentText, songInfo,
    } = this.state;
    const likeStatus = like ? 'Liked' : 'Like';
    const repostStatus = repost ? 'Reposted' : 'Repost';
    const shareStatus = share ? 'Shared' : 'Share';
    const modalStatus = show ? 'com-display' : 'com-displayNone';
    return (
      <div>
        <form className="wrapper" autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="com-commentInput">
            {artistInfo.map(profile => (
              <span className="com-profilePic" key="profile.artistId" title={`${profile.name}`}>
                <img id="profilePic" src={profile.imageURL} width="40" height="40" alt={`${profile.name}`} />
              </span>
            ))}
            <span className="com-textbox" title="Write a comment">
              <input id="text" type="text" placeholder="Write a comment" value={commentText} onChange={this.handleChange} />
            </span>
          </div>
        </form>
        <div className="com-createButtons">
          <button className={`com-button com-${like}`} title="Like" onClick={this.toggleLike} type="button">
            <i className="fas fa-heart" />
            {likeStatus}

          </button>
          <button className={`com-button com-${repost}`} title="Repost" onClick={this.toggleRepost} type="button">
            <i className="fas fa-retweet" />
            {repostStatus}

          </button>
          <button className={`com-button com-${share}`} title="Share" onClick={this.toggleShare} type="button">
            <i className="fas fa-share-square" />
            {shareStatus}

          </button>
          <button className={`com-button com-${show}`} title="More Options" onClick={this.toggleModal} type="button">
            <i className="fas fa-ellipsis-h" />
More
          </button>
          <MoreModal status={modalStatus} />
          <a id="buyIn" href="#" title="Click to buy or stream">
    Stream/Download
          </a>

          {songInfo.map(songProfile => (
            <ul key="songProfile.id" className="soundStats">
              <li className="miniStats-Static" title={`${songProfile.plays} plays`}>
                <span>
                  <i className="fas fa-play" />
                  {Numeral(songProfile.plays).format('0.0a')}
                </span>
              </li>
              <li className="com-miniStats" title={`${songProfile.likes} likes`}>
                <span>
                  <i className="fas fa-heart" />
                  {Numeral(songProfile.likes).format('0.0a')}
                </span>
              </li>
              <li className="com-miniStats" title={`${songProfile.reposts} reposts`}>
                <span>
                  <i className="fas fa-share-square" />
                  {Numeral(songProfile.reposts).format('0.00a')}
                </span>
              </li>
            </ul>
          ))}
          <div className="com-border" />
        </div>
      </div>
    );
  }
}

Comment.defaultProps = {
  songId: 1,
  commentText: '',
  artistInfo: [],
  songInfo: [],
  show: false,
  like: false,
  repost: false,
  share: false,
};
