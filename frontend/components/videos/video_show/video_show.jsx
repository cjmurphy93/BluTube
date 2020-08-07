import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

class VideoShow extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        
       this.props.fetchVideo(this.props.match.params.videoId);
       
        // this.props.fetchUser(video.creator_id);
    }

    render() {
        const { video } = this.props;
        if (!video) return null;
        
        return (
            <div className="video-show">
                <div className="primary-show">
                <div className="player-container">
                <video className="video-player"
                src={video.videoUrl} controls autoPlay></video>
                </div>
                <div className="video-show-info">
        <h1 className="video-show-title">{video.title}</h1>
        <span className="show-vad">views</span>
                </div>
                <div className="video-show-meta">
                    <div className="show-name-bar">
                        <FontAwesomeIcon icon={faUserCircle} className="show-icon" />
        <span className="show-name">{video.creator.first_name} {video.creator.last_name}</span>
                    </div>
                </div>
                </div>
                <div className="up-next-col">
                    <div className="show-preview">
                    <video className="col-video"
                        src={video.videoUrl} ></video>
                        <div className="sp-info">
                            <span className="sp-info-title">{video.title}</span>
                            <span className="sp-name">{video.creator.first_name} {video.creator.last_name}</span>
                            <span className="sp-vad">views</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default VideoShow;