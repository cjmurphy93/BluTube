import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  }

  startVideo(e) {
    e.currentTarget.play();
  }

  stopVideo(e) {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  }

  render() {
    const { videos } = this.props;

    const index = Object.values(videos);
    // randomizing the order
    for (let i = index.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = index[i];
      index[i] = index[j];
      index[j] = temp;
    }
    const previews = index.map((video, idx) => {
      const vws = video.numViews === 1 ? "view" : "views";
      const thumbnail = video.thumbnailUrl ? (
        <img src={video.thumbnailUrl} className="index-thumbnail" />
      ) : (
        <></>
      );
      return (
        <div key={video.id} className="video-preview">
          <Link to={`/videos/${video.id}`}>
            <div className="video-mini-container">
              <video
                className="video-mini"
                src={video.videoUrl}
                onMouseOver={this.startVideo}
                onMouseOut={this.stopVideo}
                muted
                loop
              ></video>
              {thumbnail}
            </div>
            <div className="preview-meta-info">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="preview-info-icon"
              />
              <div className="preview-info">
                <h3 className="index-video-title">{video.title}</h3>
                <p className="index-creator">
                  {video.creator.first_name} {video.creator.last_name}
                </p>
                <p className="index-creator">
                  {video.numViews} {vws} • {video.timeSinceUpload}
                </p>
              </div>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div className={`index-container`}>
        <Helmet>
          <title>BluTube</title>
        </Helmet>
        <div className="grid-title">
          <h1 className="gt-text">Recommended</h1>
        </div>

        <div className="index">{previews}</div>
      </div>
    );
  }
}

export default VideoIndex;
