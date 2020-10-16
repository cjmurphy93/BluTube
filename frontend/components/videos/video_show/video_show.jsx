import React from 'react';
import VideoLikes from '../../likes/video_likes/video_likes_container';
import CommentIndex from '../../comments/comment_index_container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

class VideoShow extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    };

    componentDidMount() {
        
       this.props.fetchVideo(this.props.match.params.videoId);
    //    document.title = this.props.video.title;
       
        // this.props.fetchUser(video.creator_id);
    }

    handleDelete(e) {
      e.preventDefault();
      const {video, currentUser} = this.props;
      if (currentUser.id === video.creator.id) {
      this.props.destroyVideo(video).then(() => {
        this.props.history.push(`/`);
      });
    }

    }

    render() {
        const { video, currentUser } = this.props;
        if (!video) return null;

        const deletebtn = ((currentUser) && (currentUser.id === video.creator.id)) ? (
          <button onClick={this.handleDelete}>DELETE</button>
        ) : (
          <></>
        );

        const vws = video.numViews === 1 ? "view" : "views";
        
        return (
          <div className="video-show">
            <div className="primary-show">
              <div className="player-container">
                <video
                  className="video-player"
                  src={video.videoUrl}
                  controls
                  autoPlay
                ></video>
              </div>
              <div className="video-show-info">
                <h1 className="video-show-title">{video.title}</h1>
                <div className='video-show-views-likes'>
                  <span className="show-vad">{video.numViews} {vws} • {video.createdAt}</span>
                  <VideoLikes video={video} />
                </div>
              </div>
              <div className="video-show-meta">
                <div className="show-name-bar">
                  <FontAwesomeIcon icon={faUserCircle} className="show-icon" />
                  <div className='video-creator-info'>
                  <span className="show-name">
                    {video.creator.first_name} {video.creator.last_name}
                  </span>
                  {deletebtn}
                  </div>
                </div>
                <div className='video-show-description'>
                  <span className='show-description-text'>{video.description}</span>
                </div>
              </div>
              <div className='video-comments'>
                <CommentIndex key={video.id} currentVideoId={this.props.match.params.videoId} />
              </div>
            </div>
            <div className="next-col">
              <div className="up-next-vid">
                <div className="up-next-top">
                  <div className="up-next-text">Up next</div>
                </div>
                <div className="show-preview">
                  <video className="col-video" src={video.videoUrl}></video>
                  <div className="sp-info">
                    <h3 className="sp-info-title">{video.title}</h3>
                    <div className="sp-secondary-info">
                      <span className="sp-name">
                        {video.creator.first_name} {video.creator.last_name}
                      </span>
                      <span className="sp-vad">views</span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        );
    }
};

export default VideoShow;