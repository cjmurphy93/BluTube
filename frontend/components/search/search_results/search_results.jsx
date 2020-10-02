import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: this.props.videos,
    };
    this.startVideo = this.startVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
  }

  componentDidMount() {
    this.props.searchVideos(this.props.location.search);
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
      return (
        <div key={video.id} className="search-preview">
          <Link to={`/videos/${video.id}`}>
            <video
              className="search-video"
              src={video.videoUrl}
              onMouseOver={this.startVideo}
              onMouseOut={this.stopVideo}
              muted
              loop
            ></video>
            <div className="search-meta-info">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="search-info-icon"
              />
              <div className="search-info">
                <h3
                  

                    className="search-video-title"
                  >
                    {video.title}

                </h3>
                <p className="search-creator">
                  {video.creator.first_name} {video.creator.last_name}
                </p>
                <p className='search-desc'>{video.description}</p>
              </div>
            </div>
          </Link>
        </div>
      );
    });

    return (
        <div className='search-results'>
            <section className='search-top'>
                <h3>Results</h3>
            </section>
            <div className='search-result-videos'>
                {previewLis}
            </div>
        </div>
    )
  }
}

export default SearchResults;