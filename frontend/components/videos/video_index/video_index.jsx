import React from 'react';
import { Link } from 'react-router-dom';

class VideoIndex extends React.Component {
    constructor(props) {
        super(props);
        this.startVideo = this.startVideo.bind(this);
        this.stopVideo = this.stopVideo.bind(this);

    }

    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchVideos();
    }

    startVideo(e) {
        e.currentTarget.play()
    }

    stopVideo(e) {
        e.currentTarget.pause()
    }

    render () {
        const { videos, users } = this.props;
        const index = Object.values(videos);
        const previews = index.map((video, idx) => {
            return (
                <div key={video.id} className="video-thumbnail">
                    <Link to={`/videos/${video.id}`}>
                    <video className="video-mini"
                    src={video.videoUrl}
                    onMouseOver={this.startVideo}
                    onMouseOut={this.stopVideo}
                    muted={true}
                    loop></video>
                    <p className="index-video-title">{video.title}</p>
                    </Link>
            <p className="index-creator">{users[video.creator_id].first_name} {users[video.creator_id].last_name}</p>
                </div>
            );
        });

        return (
            <div className="index-container">
                {previews}
            </div>
        )
    }


}

export default VideoIndex;