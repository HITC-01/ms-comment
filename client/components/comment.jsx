import React from 'react';
import Moment from 'moment';
import Numeral from 'numeral';
import Axios from 'axios';
import MoreModal from './moreModal.jsx';
import helpers from '../helpers/commentHelpers.js';
import commentCSS from './comment.css';

const parse = (pathname) => {
  const splitString = pathname.split('/');
  return splitString[2];
};
const songId = parse(window.location.pathname);

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
      artistInfo: [],
      songInfo: [
        { songId: '' },
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
        this.grabSongInfo(songId);
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

  async grabArtistInfo(artistId) {
    const url = `/comments/artist/${artistId}/`;
    Axios.get(url)
      .then((res) => {
        const artistProfile = res.data;
        this.setState({ artistInfo: artistProfile });
      });
  }

  async grabSongInfo() {
    const url = `/comments/song/${songId}/`;
    Axios.get(url)
      .then((res) => {
        const songProfile = res.data;
        this.setState({ songInfo: songProfile });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const now = new Date();
    const { commentText, songInfo, artistInfo } = this.state;
    const url = '/comments/api/sc/';
    const data = JSON.stringify({
      text: commentText,
      createdAt: Moment(now).format('YYYY-MM-DD HH:mm:ss'),
      songtime: helpers.postSongTime(songInfo[0].songlength),
      artist_Id: artistInfo[0].artistId,
      song_Id: songInfo[0].songId,
    });

    Axios.post(url, { data }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        this.setState({ commentText: '' });
      })
      .catch((error) => {
        console.log('Data not posted', error);
      });
  }

  render() {
    const {
      like, repost, share, show, artistInfo, commentText, songInfo,
    } = this.state;
    const likeStatus = like ? 'Liked' : 'Like';
    const repostStatus = repost ? 'Reposted' : 'Repost';
    const shareStatus = share ? 'Shared' : 'Share';
    return (
      <div>
        <form className={commentCSS.wrapper} autoComplete="off" onSubmit={this.handleSubmit}>
          <div className={commentCSS.comCommentInput}>
            {artistInfo.map(profile => (
              <span className={commentCSS.comProfilePic} key="profile.artistId" title={`${profile.name}`}>
                <img id={commentCSS.profilePic} src={profile.imageURL} width="40" height="40" alt={`${profile.name}`} />
              </span>
            ))}
            <span className={commentCSS.comTextbox} title="Write a comment">
              <input id="text" type="text" className={commentCSS.textBoxCreateComment} placeholder="Write a comment" value={commentText} onChange={this.handleChange} />
            </span>
          </div>
        </form>
        <div className={commentCSS.comCreateButtons}>
          <button className={!like ? commentCSS.comButton : commentCSS.comTrue} title="Like" onClick={this.toggleLike} type="button">
            <i className="fas fa-heart" />
            {likeStatus}

          </button>
          <button className={!repost ? commentCSS.comButton : commentCSS.comTrue} title="Repost" onClick={this.toggleRepost} type="button">
            <i className="fas fa-retweet" />
            {repostStatus}

          </button>
          <button className={!share ? commentCSS.comButton : commentCSS.comTrue} title="Share" onClick={this.toggleShare} type="button">
            <i className="fas fa-share-square" />
            {shareStatus}

          </button>
          <span className={commentCSS.moreModalLinks}>
            <button className={!show ? commentCSS.comButton : commentCSS.comTrue} title="More Options" onClick={this.toggleModal} type="button">
            <i className="fas fa-ellipsis-h" />
More
          </button>
            <MoreModal status={show} />
          </span>
          <a id={commentCSS.buyIn} className={commentCSS.streamText} href="#" title="Click to buy or stream">
    Stream/Download
          </a>

          {songInfo.map(songProfile => (
            <ul key="songProfile.id" className={`${commentCSS.ulmain}`}>
              <li className={`${commentCSS.comMiniStats} ${commentCSS.limain}`} title={`${songProfile.plays} plays`}>
                <span>
                  <i className="fas fa-play" />
                  {Numeral(songProfile.plays).format('0.0a')}
                </span>
              </li>
              <li className={`${commentCSS.comMiniStats} ${commentCSS.limain}`} title={`${songProfile.likes} likes`}>
                <span>
                  <i className="fas fa-heart" />
                  {Numeral(songProfile.likes).format('0.0a')}
                </span>
              </li>
              <li className={`${commentCSS.comMiniStats} ${commentCSS.limain}`} title={`${songProfile.reposts} reposts`}>
                <span>
                  <i className="fas fa-share-square" />
                  {Numeral(songProfile.reposts).format('0.00a')}
                </span>
              </li>
            </ul>
          ))}
          <div className={commentCSS.comBorder} />
        </div>
      </div>
    );
  }
}

Comment.defaultProps = {
  commentText: '',
  artistInfo: [],
  songInfo: [],
  show: false,
  like: false,
  repost: false,
  share: false,
};
