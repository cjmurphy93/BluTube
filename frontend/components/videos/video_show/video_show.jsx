import React from 'react';

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
                <div className="player-container">
                <video className="video-player"
                src={video.videoUrl} controls></video>
                </div>
                <div className="video-show-info">
        <h1 className="video-show-title">{video.title}</h1>
                </div>
                <div className="video-show-meta">
        {/* <span className="show-name">{user.first_name} {user.last_name}</span> */}
                </div>
            </div>
        )
    }
};

export default VideoShow;