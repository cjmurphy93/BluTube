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
            currentUserLiked: !!this.props.currentUser.videolikes.find(x => (x.likeable_id === this.props.video.id && x.dislike === false)),
            currentUserDisliked: !!this.props.currentUser.videolikes.find(x => (x.likeable_id === this.props.video.id && x.dislike === true)),
        };
    };

    render() {
        const { video, numLikes, numDislikes, currentUserDisliked, currentUserLiked } = this.state;

        return (
          <div className="video-like-dislike-container">
            <div className="video-likes-container">
              <FontAwesomeIcon icon={faThumbsUp} className="video-thums-up" />
              <span classname="video-num-likes">{numLikes}</span>
            </div>
            <div className="video-dislikes-container">
              <FontAwesomeIcon icon={faThumbsdown} className="video-thums-up" />
              <span classname="video-num-likes">{numDislikes}</span>
            </div>
          </div>
        );
    }
};

export default VideoLikes;