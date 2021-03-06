import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

class VideoLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: this.props.video,
      currentUser: this.props.currentUser,
      numLikes: this.props.video.numLikes,
      numDislikes: this.props.video.numDislikes,
      currentUserLiked: this.props.currentUserLiked,
      currentUserDisliked: this.props.currentUserDisliked,
    };

    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.getLikeProportion = this.getLikeProportion.bind(this);
    this.getDislikeProportion = this.getDislikeProportion.bind(this);
  }

  handleLike(e) {
    e.preventDefault();
    const {
      video,
      numLikes,
      numDislikes,
      currentUserLiked,
      currentUserDisliked,
    } = this.state;
    if (currentUserLiked) {
      let newNumLikes = numLikes - 1;
      this.props.deleteVideoLike(video.id);
      this.setState({ currentUserLiked: false, numLikes: newNumLikes });
    } else if (currentUserDisliked) {
      let newNumLikes = numLikes + 1;
      let newNumDislikes = numDislikes - 1;
      this.props.createVideoLike(video.id, false);
      this.setState({
        currentUserLiked: true,
        currentUserDisliked: false,
        numLikes: newNumLikes,
        numDislikes: newNumDislikes,
      });
    } else {
      let newNumLikes = numLikes + 1;
      this.props.createVideoLike(video.id, false);
      this.setState({
        currentUserLiked: true,
        currentUserDisliked: false,
        numLikes: newNumLikes,
      });
    }
  }

  handleDislike(e) {
    e.preventDefault();
    const {
      video,
      numLikes,
      numDislikes,
      currentUserLiked,
      currentUserDisliked,
    } = this.state;
    if (currentUserDisliked) {
      let newNumDislikes = numDislikes - 1;
      this.props.deleteVideoLike(video.id);
      this.setState({
        currentUserDisliked: false,
        numDislikes: newNumDislikes,
      });
    } else if (currentUserLiked) {
      let newNumLikes = numLikes - 1;
      let newNumDislikes = numDislikes + 1;
      this.props.createVideoLike(video.id, true);
      this.setState({
        currentUserLiked: false,
        currentUserDisliked: true,
        numLikes: newNumLikes,
        numDislikes: newNumDislikes,
      });
    } else {
      let newNumDislikes = numDislikes + 1;
      this.props.createVideoLike(video.id, true);
      this.setState({
        currentUserLiked: false,
        currentUserDisliked: true,
        numDislikes: newNumDislikes,
      });
    }
  }

  getLikeProportion() {
    let numLikes = this.state.numLikes;
    let totalNum = this.state.numLikes + this.state.numDislikes;
    let result = (numLikes / totalNum) * 100;
    if (result === NaN || totalNum === 0) {
      return "50%";
    } else {
      return `${result}%`;
    }
  }

  getDislikeProportion() {
    let numDislikes = this.state.numDislikes;
    let totalNum = this.state.numLikes + this.state.numDislikes;
    let result = (numDislikes / totalNum) * 100;
    if (result === NaN || totalNum === 0) {
      return `50%`;
    } else {
      return `${result}%`;
    }
  }

  render() {
    const {
      video,
      currentUser,
      numLikes,
      numDislikes,
      currentUserDisliked,
      currentUserLiked,
    } = this.state;
    const blueLike = currentUserLiked ? "bl" : "";
    const blueDislike = currentUserDisliked ? "bl" : "";
    let likeBarStyle = "";
    let dislikeBarStyle = "";
    if (this.props.video) {
      likeBarStyle = {
        width: this.getLikeProportion(),
      };
      dislikeBarStyle = {
        width: this.getDislikeProportion(),
      };
    }

    const likesDisplay = currentUser ? (
      <div className="show-likes-wrapper">
        <div className={`video-like-dislike-container  `}>
          <div className="video-likes-container" onClick={this.handleLike}>
            <div className="thumb-up-container">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className={`video-thumbs-up ${blueLike}`}
              />
            </div>
            <span className={`video-num-likes ${blueLike}`}>{numLikes}</span>
          </div>
          <div
            className="video-likes-container dis"
            onClick={this.handleDislike}
          >
            <div className="thumb-up-container">
              <FontAwesomeIcon
                icon={faThumbsDown}
                className={`video-thumbs-down ${blueDislike}`}
              />
            </div>
            <span className={`video-num-likes ${blueDislike}`}>
              {numDislikes}
            </span>
          </div>
        </div>
        <div className="like-dislike-bar-container">
          <div className={`like-bar ${blueLike}`} style={likeBarStyle}></div>
          <div
            className={`dislike-bar ${blueDislike}`}
            style={dislikeBarStyle}
          ></div>
        </div>
      </div>
    ) : (
      <div className="show-likes-wrapper">
        <div className="video-like-dislike-container">
          <div className="video-likes-container">
            <div className="thumb-up-container">
              <FontAwesomeIcon icon={faThumbsUp} className="video-thumbs-up" />
            </div>
            <span className="video-num-likes">{numLikes}</span>
          </div>
          <div className="video-likes-container dis">
            <div className="thumb-up-container">
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="video-thumbs-down"
              />
            </div>
            <span className="video-num-likes">{numDislikes}</span>
          </div>
        </div>
        <div className="like-dislike-bar-container">
          <div className="like-bar" style={likeBarStyle}></div>
          <div className="dislike-bar" style={dislikeBarStyle}></div>
        </div>
      </div>
    );

    return <div>{likesDisplay}</div>;
  }
}

export default VideoLikes;
