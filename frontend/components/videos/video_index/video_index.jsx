import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class VideoIndex extends React.Component {
    constructor(props) {
        super(props);
        this.startVideo = this.startVideo.bind(this);
        this.stopVideo = this.stopVideo.bind(this);

    }

    componentDidMount() {
        this.props.fetchVideos();
        // document.title = "BluTube";
    }

    startVideo(e) {
        e.currentTarget.play()
    }

    stopVideo(e) {
        e.currentTarget.pause();
        e.currentTarget.currentTime = 0;
    }

    render () {
        const { videos } = this.props;
        const index = Object.values(videos);
        const previews = index.map((video, idx) => {
            return (
                <div key={video.id} className="video-preview">
                    <Link to={`/videos/${video.id}`}>
                        <video className="video-mini"
                        src={video.videoUrl}
                        onMouseOver={this.startVideo}
                        onMouseOut={this.stopVideo}
                        muted
                        loop></video>
                    </Link>
                    <div className='preview-meta-info'>
                        <FontAwesomeIcon icon={faUserCircle} className='preview-info-icon' />
                        <div className='preview-info'>
                            <h3>
                            <Link to={`/videos/${video.id}`}
                            className="index-video-title">
                                {video.title}
                            </Link>
                            </h3>
                            <p className="index-creator">{video.creator.first_name} {video.creator.last_name}</p>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="index-container">
                
                    <div className="grid-title"><span className="gt-text">Recommended</span></div>
                
                <div className="index">
                {previews}
                </div>
            </div>
        )
    }


}

export default VideoIndex;