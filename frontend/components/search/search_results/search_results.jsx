import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: this.props.videos,
      search: this.props.location.search,
    };
    this.startVideo = this.startVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.hashCode = this.hashCode.bind(this);
    this.intToRGB = this.intToRGB.bind(this);
  }

  componentDidMount() {
    this.props.searchVideos(this.props.location.search);
  }

  componentDidUpdate() {
    if (this.state.search !== this.props.location.search) {
      this.props.searchVideos(this.props.location.search);
      this.setState({ search: this.props.location.search });
    }
  }

  startVideo(e) {
    e.currentTarget.play();
  }

  stopVideo(e) {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  }

  hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  intToRGB(i) {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  render() {
    const { videos } = this.props;
    const previewLis = videos.map((video) => {
      const vws = video.numViews === 1 ? "view" : "views";

      const creatorName =
        video.creator.first_name.trim() + video.creator.last_name.trim();
      const nameColor = this.intToRGB(this.hashCode(creatorName));
      const iconStyle = {
        backgroundColor: `#${nameColor}`,
      };
      const creatorIcon = video.creator.profilePicUrl ? (
        <div className="search-pro-pic-wrapper">
          <img
            src={video.creator.profilePicUrl}
            className="search-pro-pic"
            // onClick={this.handleClick}
          />
        </div>
      ) : (
        <div className="search-creator-initial" style={iconStyle}>
          <p>{creatorName[0]}</p>
        </div>
      );
      return (
        <div key={video.id} className="search-preview">
          <Link to={`/videos/${video.id}`}>
            {/* <div className='search-preview-contents'> */}
            <video
              className="search-video"
              src={video.videoUrl}
              onMouseOver={this.startVideo}
              onMouseOut={this.stopVideo}
              muted
              loop
            ></video>
            {/* <div className="search-meta-info"> */}
            <div className="search-info">
              <h3 className="search-video-title">{video.title}</h3>
              <p className="search-vad">
                {video.numViews} {vws} • {video.timeSinceUpload}
              </p>
              <div className="search-icon-name">
                {/* <FontAwesomeIcon
                  icon={faUserCircle}
                  className="search-info-icon"
                /> */}
                {creatorIcon}
                <p className="search-creator">
                  {video.creator.first_name} {video.creator.last_name}
                </p>
              </div>
              <p className="search-desc">{video.description}</p>
            </div>
            {/* </div> */}
            {/* </div> */}
          </Link>
        </div>
      );
    });

    return (
      <div className="search-results">
        <div className="results-content">
          <section className="search-top">
            <h3>Results</h3>
          </section>
          <div className="search-result-videos">{previewLis}</div>
        </div>
      </div>
    );
  }
}

export default SearchResults;
