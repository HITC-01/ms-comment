const convertTime = (totalSeconds) => {
  const minutes = `${Math.floor(totalSeconds / 60)}`;
  let seconds = `${totalSeconds - minutes * 60}`;
  if (seconds.length === 1) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

const postSongTime = songtime => Math.floor(Math.random() * songtime);

const helpers = {
  convertTime,
  postSongTime,
};

export default helpers;
