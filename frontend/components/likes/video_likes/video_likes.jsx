import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

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
      this.setState({ currentUserDisliked: false, numDislikes: newNumDislikes });
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

  render() {
    const {
      video,
      currentUser,
      numLikes,
      numDislikes,
      currentUserDisliked,
      currentUserLiked,
    } = this.state;
const blueLike = currentUserLiked ? 'bl' : '';
const blueDislike = currentUserDisliked ? 'bl' : '';

    // if (currentUserLiked && !currentUserDisliked) {
    //     let blueLike = 'bl';
    //     let blueDislike = '';
    // } else if (currentUserDisliked && !currentUserLiked) {
    //     let blueLike = '';
    //     let blueDislike = 'bl';
    // } else {
    //     let blueLike = '';
    //     let blueDislike = '';
    // }

    const likesDisplay = currentUser ? (
      <div className="video-like-dislike-container">
        <div className="video-likes-container" onClick={this.handleLike}>
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={`video-thumbs-up ${blueLike}`}
          />
          <span className="video-num-likes">{numLikes}</span>
        </div>
        <div className="video-dislikes-container" onClick={this.handleDislike}>
          <FontAwesomeIcon
            icon={faThumbsDown}
            className={`video-thumbs-up ${blueDislike}`}
          />
          <span className="video-num-likes">{numDislikes}</span>
        </div>
      </div>
    ) : (
      <div className="video-like-dislike-container">
        <div className="video-likes-container">
          <FontAwesomeIcon icon={faThumbsUp} className="video-thums-up" />
          <span className="video-num-likes">{numLikes}</span>
        </div>
        <div className="video-dislikes-container">
          <FontAwesomeIcon icon={faThumbsDown} className="video-thums-up" />
          <span className="video-num-likes">{numDislikes}</span>
        </div>
      </div>
    );

    return (
        <div>

            {likesDisplay}
        </div>
    );
  }
};

export default VideoLikes;