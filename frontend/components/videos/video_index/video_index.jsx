import React from 'react';
import { Link } from 'react-router-dom';

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
        e.currentTarget.pause()
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
                        <Link to={`/videos/${video.id}`}
                        className="index-video-title">
                    {video.title}
                    </Link>
            <p className="index-creator">{video.creator.first_name} {video.creator.last_name}</p>
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