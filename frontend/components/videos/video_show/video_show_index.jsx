import React from 'react';
import { Link } from 'react-router-dom';

class VideoShowIndex extends React.Component {
    constructor(props) {
        super(props);
        this.startVideo = this.startVideo.bind(this);
        this.stopVideo = this.stopVideo.bind(this);
    };

    componentDidMount() {
        // this.props.fetchVideos();
    }

    componentDidUpdate() {

    }

    startVideo(e) {
        e.currentTarget.play()
    };

    stopVideo(e) {
        e.currentTarget.pause();
        e.currentTarget.currentTime = 0;
    };

    render() {
        const { videos, currentUser, currentVideoId} = this.props;
        const sideIndex = Object.assign({}, videos);
        delete sideIndex[currentVideoId];
        const index = Object.values(sideIndex);
                // randomizing the order
        for(let i = index.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = index[i]
            index[i] = index[j]
            index[j] = temp
        };
        const previews = index.map((video, idx) => {
            const topVid = idx === 0 ? "top-vid" : "";
            const vws = video.numViews === 1 ? "view" : "views";

            return (
                <div key={video.id} className={`show-index-item ${topVid}`}>

                    <Link to={`/videos/${video.id}`}>

                <div className="show-preview">
                  <video className="col-video" 
                        src={video.videoUrl}
                        onMouseOver={this.startVideo}
                        onMouseOut={this.stopVideo}
                        muted
                        loop></video>
                  <div className="sp-info">
                    <h3 className="sp-info-title">{video.title}</h3>
                    <div className="sp-secondary-info">
                      <span className="sp-name">
                        {video.creator.first_name} {video.creator.last_name}
                      </span>
                      <span className="sp-vad">{video.numViews} {vws} • {video.timeSinceUpload}</span>
                    </div>
                  </div>
                </div>
                    </Link>
                    
                </div>
            )
        });
        return(
            <div>
                {previews}
            </div>
        )

    };

}

export default VideoShowIndex;