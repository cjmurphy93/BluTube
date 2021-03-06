import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

class CommentLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment,
      currentUser: this.props.currentUser,
      numLikes: this.props.comment.numLikes,
      numDislikes: this.props.comment.numDislikes,
      currentUserLiked: this.props.currentUserLiked,
      currentUserDisliked: this.props.currentUserDisliked,
    };

    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  handleLike(e) {
    e.preventDefault();
    const {
      comment,
      numLikes,
      numDislikes,
      currentUserLiked,
      currentUserDisliked,
    } = this.state;
    if (currentUserLiked) {
      let newNumLikes = numLikes - 1;
      this.props.deleteCommentLike(comment.id);
      this.setState({ currentUserLiked: false, numLikes: newNumLikes });
    } else if (currentUserDisliked) {
      let newNumLikes = numLikes + 1;
      let newNumDislikes = numDislikes - 1;
      this.props.createCommentLike(comment.id, false);
      this.setState({
        currentUserLiked: true,
        currentUserDisliked: false,
        numLikes: newNumLikes,
        numDislikes: newNumDislikes,
      });
    } else {
      let newNumLikes = numLikes + 1;
      this.props.createCommentLike(comment.id, false);
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
      comment,
      numLikes,
      numDislikes,
      currentUserLiked,
      currentUserDisliked,
    } = this.state;
    if (currentUserDisliked) {
      let newNumDislikes = numDislikes - 1;
      this.props.deleteCommentLike(comment.id);
      this.setState({
        currentUserDisliked: false,
        numDislikes: newNumDislikes,
      });
    } else if (currentUserLiked) {
      let newNumLikes = numLikes - 1;
      let newNumDislikes = numDislikes + 1;
      this.props.createCommentLike(comment.id, true);
      this.setState({
        currentUserLiked: false,
        currentUserDisliked: true,
        numLikes: newNumLikes,
        numDislikes: newNumDislikes,
      });
    } else {
      let newNumDislikes = numDislikes + 1;
      this.props.createCommentLike(comment.id, true);
      this.setState({
        currentUserLiked: false,
        currentUserDisliked: true,
        numDislikes: newNumDislikes,
      });
    }
  }

  render() {
    const {
      comment,
      currentUser,
      numLikes,
      numDislikes,
      currentUserDisliked,
      currentUserLiked,
    } = this.state;
    const blueLike = currentUserLiked ? "bl" : "";
    const blueDislike = currentUserDisliked ? "bl" : "";

    const likesDisplay = currentUser ? (
      <div className={`video-like-dislike-container comment-likes`}>
        <div className="video-likes-container" onClick={this.handleLike}>
          <div className="thumb-up-container">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={`video-thumbs-up ${blueLike} comment-thumb`}
            />
          </div>
          <span className={`video-num-likes ${blueLike}`}>{numLikes}</span>
        </div>
        <div className="video-likes-container dis" onClick={this.handleDislike}>
          <div className="thumb-up-container">
            <FontAwesomeIcon
              icon={faThumbsDown}
              className={`video-thumbs-down ${blueDislike} comment-thumb`}
            />
          </div>
          {/* <span className={`video-num-likes ${blueDislike}`}>
            {numDislikes} */}
          {/* </span> */}
        </div>
      </div>
    ) : (
      <div className="video-like-dislike-container comment-likes">
        <div className="video-likes-container">
          <div className="thumb-up-container">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="video-thumbs-up comment-thumb"
            />
          </div>
          <span className="video-num-likes">{numLikes}</span>
        </div>
        <div className="video-likes-container dis">
          <div className="thumb-up-container">
            <FontAwesomeIcon
              icon={faThumbsDown}
              className="video-thumbs-down comment-thumb"
            />
          </div>
          {/* <span className="video-num-likes">{numDislikes}</span> */}
        </div>
      </div>
    );

    return <div>{likesDisplay}</div>;
  }
}

export default CommentLikes;
