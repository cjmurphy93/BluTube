import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: this.props.videos,
      search: this.props.location.search
    };
    this.startVideo = this.startVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
  }

  componentDidMount() {
    this.props.searchVideos(this.props.location.search);
  }

  componentDidUpdate() {
    if (this.state.search !== this.props.location.search) {
      this.props.searchVideos(this.props.location.search);
      this.setState({search: this.props.location.search})
    }
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
    const previewLis = videos.map((video) => {
      const vws = video.numViews === 1 ? "view" : "views";
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
                <h3 className="search-video-title">
                    {video.title}
                </h3>
                <p className="search-vad">{video.numViews} {vws} • {video.timeSinceUpload}</p>
                <div className='search-icon-name'>
              <FontAwesomeIcon
                icon={faUserCircle}
                className="search-info-icon"
                />
                <p className="search-creator">
                  {video.creator.first_name} {video.creator.last_name}
                </p>
                </div>
                <p className='search-desc'>{video.description}</p>
              </div>
            {/* </div> */}
                  {/* </div> */}
          </Link>
        </div>
      );
    });

    return (
        <div className='search-results'>
          <div className='results-content'>
            <section className='search-top'>
                <h3>Results</h3>
            </section>
            <div className='search-result-videos'>
                {previewLis}
            </div>
          </div>
        </div>
    )
  }
}

export default SearchResults;