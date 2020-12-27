import React from "react";
import { Link } from "react-router-dom";

class VideoShowIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: this.props.videos,
      previews: [],
    };
    this.startVideo = this.startVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.randomize = this.randomize.bind(this);
  }

  componentDidMount() {
    const previews = this.randomize(this.props.videos);
    this.setState({ previews });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentVideoId !== this.props.currentVideoId) {
      const previews = this.randomize(this.props.videos);
      this.setState({ previews });
    }
    if (
      Object.values(this.props.videos).length !==
      Object.values(prevProps.videos).length
    ) {
      const previews = this.randomize(this.props.videos);
      this.setState({ previews });
    }
  }

  startVideo(e) {
    e.currentTarget.play();
  }

  stopVideo(e) {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  }

  randomize(videos) {
    const index = Object.values(videos).filter(
      (video) => video.id !== this.props.currentVideoId
    );
    for (let i = index.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = index[i];
      index[i] = index[j];
      index[j] = temp;
    }
    return index;
  }

  render() {
    const { previews } = this.state;

    const sidebar = previews.map((video, idx) => {
      const topVid = idx === 0 ? "top-vid" : "";
      const vws = video.numViews === 1 ? "view" : "views";
      const thumbnail = video.thumbnailUrl ? (
        <img src={video.thumbnailUrl} className="index-thumbnail" />
      ) : (
        <></>
      );
      const hasThumbnail = video.thumbnailUrl ? "has-thumbnail" : "";

      return (
        <div key={video.id} className={`show-index-item ${topVid}`}>
          <Link to={`/videos/${video.id}`}>
            <div className="show-preview">
              <div>
                <video
                  className={`col-video ${hasThumbnail}`}
                  src={video.videoUrl}
                  onMouseOver={this.startVideo}
                  onMouseOut={this.stopVideo}
                  muted
                  loop
                ></video>
                {thumbnail}
              </div>
              <div className="sp-info">
                <h3 className="sp-info-title">{video.title}</h3>
                <div className="sp-secondary-info">
                  <span className="sp-name">
                    {video.creator.first_name} {video.creator.last_name}
                  </span>
                  <span className="sp-vad">
                    {video.numViews} {vws} • {video.timeSinceUpload}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
    return <div>{sidebar}</div>;
  }
}

export default VideoShowIndex;
