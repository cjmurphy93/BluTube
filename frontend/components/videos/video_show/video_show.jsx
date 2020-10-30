import React from 'react';
import VideoLikes from '../../likes/video_likes/video_likes_container';
import CommentIndex from '../../comments/comment_index_container';
// import VideoShowIndex from './video_show_index';
import VideoShowIndex from './video_show_index_container';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

class VideoShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          videoId: this.props.match.params.videoId,
          videos: this.props.videos,
          video: this.props.video
        };

        this.handleEdit = this.handleEdit.bind(this);
    };

    componentDidMount() {
        
       this.props.fetchVideos();
       //    document.title = this.props.video.title;
       
       // this.props.fetchUser(video.creator_id);
       this.props.fetchVideo(this.props.match.params.videoId);
      }
      
     componentDidUpdate(prevProps) {
       if (this.props.match.params.videoId && this.state.videoId !== this.props.match.params.videoId) {
        // if (this.props.videoId !== prevProps.videoId) {
      //   debugger
      //   //  const vids = Object.assign({}, this.state.videos);
        this.setState({videoId: this.props.match.params.videoId})
         this.props.fetchVideo(this.props.match.params.videoId)
         this.props.fetchVideos();
        //  .then(() => {
        //    this.setState(prevState => {
        //     vids[this.props.match.params.videoId] = this.props.video;
        //     return {videoId: this.props.match.params.videoId, video: vids, video: this.props.video }});
        //  this.props.fetchVideos();
        //  });
        };
     } 


    handleEdit(e) {
      e.preventDefault();
      const {video, currentUser} = this.props;
      if (currentUser.id === video.creator.id) {
        this.props.history.push(`/videos/${video.id}/edit`)
      }
    }

    

    render() {
        const { video, currentUser } = this.props;
        if (!video) return null;

        const editbtn = ((currentUser) && (currentUser.id === video.creator.id)) ? (
          <button className='publish edit-btn' onClick={this.handleEdit}>EDIT</button>
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
                    <div className='name-and-btn'>
                  <span className="show-name">
                    {video.creator.first_name} {video.creator.last_name}
                  </span>
                  {editbtn}
                  </div>
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
            <div className="next-col-wrapper">
            <div className="next-col">
              <div className="up-next-vid">
                <div className="up-next-top">
                  <div className="up-next-text">Up next</div>
                </div>
                <VideoShowIndex currentVideoId={video.id} 
                // videos={this.props.videos}
                />
              </div>
              </div>
            </div>
          </div>
        );
    }
};

export default VideoShow;