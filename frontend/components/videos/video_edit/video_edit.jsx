import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

class VideoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.video;
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleThumbnail = this.handleThumbnail.bind(this);
    this.findFileInput = this.findFileInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.videoId);
  }

  handleDelete(e) {
    e.preventDefault();
    const { video, currentUser } = this.props;
    if (currentUser.id === video.creator.id) {
      this.props.destroyVideo(video).then(() => {
        this.props.history.push(`/`);
      });
    }
  }

  handleUndo(e) {
    e.preventDefault();
    if (this.state !== this.props.video) {
      this.setState(this.props.video);
      if (!this.props.video.thumbnailUrl) {
        this.setState({ thumbnailFile: undefined, thumbnailUrl: undefined });
      }
    }
  }

  handleInput(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  findFileInput() {
    document.getElementById("file").click();
  }

  handleThumbnail(e) {
    const file = e.currentTarget.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        this.setState({
          thumbnailFile: file,
          thumbnailUrl: fileReader.result,
        });
      };
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const video = new FormData();
    video.append("video[title]", this.state.title);
    video.append("video[description]", this.state.description);
    if (this.state.thumbnailFile) {
      video.append("video[thumbnail]", this.state.thumbnailFile);
    }

    this.props.updateVideo(video, this.props.video.id).then(() => {
      return this.props.history.push(`/videos/${this.props.video.id}`);
    });
  }

  render() {
    if (
      !this.props.video ||
      this.props.currentUser.id !== this.props.video.creator.id
    )
      return null;

    const {
      title,
      description,
      videoUrl,
      fileName,
      thumbnailFile,
      thumbnailUrl,
    } = this.state;

    const deleteBtn =
      this.props.currentUser &&
      this.props.currentUser.id === this.props.video.creator.id ? (
        <button onClick={this.handleDelete}>DELETE</button>
      ) : (
        <></>
      );

    const publishButton =
      (title && title !== this.props.video.title) ||
      description !== this.props.video.description ||
      thumbnailUrl !== this.props.video.thumbnailUrl ? (
        <button className="publish save-btn" onClick={this.handleSubmit}>
          SAVE
        </button>
      ) : (
        <button className="publish save-btn-disabled">SAVE</button>
      );

    const thumbnail = thumbnailUrl ? (
      <img
        src={thumbnailUrl}
        alt="thumbnail"
        className="thumbnail-preview"
        onClick={this.findFileInput}
      />
    ) : (
      <div className="thumbnail-upload-button" onClick={this.findFileInput}>
        <FontAwesomeIcon className="thumbnail-icon" icon={faImage} />
        <span>Upload thumbnail</span>
      </div>
    );

    const titleError = title.length ? "title" : "title-error";

    const undoBtn =
      this.state.title !== this.props.video.title ||
      this.state.description !== this.props.video.description ||
      thumbnailUrl !== this.props.video.thumbnailUrl ? (
        <button className="publish undo-btn" onClick={this.handleUndo}>
          UNDO CHANGES
        </button>
      ) : (
        <button className="publish undo-btn-disabled">UNDO CHANGES</button>
      );

    const waiting = this.state === this.props.video ? "undo-waiting" : "";

    return (
      <div className="edit-video">
        <div className="edit-top">
          <div className="edit-top-inner">
            <div className="edit-top-bottom">
              <h2>Video details</h2>
              <div className="edit-buttons">
                {undoBtn}
                {publishButton}
                {deleteBtn}
              </div>
            </div>
          </div>
        </div>

        <section id="edc-2" className="upload-content-2 edc-2">
          <section className="upload-details edd-2">
            <div className={`textarea-container ${titleError}`}>
              <div className="outer-textarea ed-ot">
                <p className="title-textarea-header">Title (required)</p>
                <textarea
                  className="upload-textarea ed-ta"
                  cols="30"
                  rows="10"
                  placeholder="Add a title that describes your video"
                  onChange={this.handleInput("title")}
                  value={title}
                ></textarea>
              </div>
            </div>

            <div className="textarea-container description">
              <div className="outer-textarea ed-ot">
                <p className="description-textarea-header">Description</p>
                <textarea
                  className="upload-textarea"
                  cols="30"
                  rows="10"
                  placeholder="Tell viewers about your video"
                  onChange={this.handleInput("description")}
                  value={description}
                ></textarea>
              </div>
            </div>

            <div className="thumbnail-upload-form">
              <h3>Thumbnail</h3>
              <p>
                Select or upload a picture that shows what's in your video. A
                good thumbnail stands out and draws viewers' attention.
              </p>
              <div className="thumbnail-previews">
                <div className="thumbnail-upload-container">
                  {thumbnail}
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".jpg"
                    onChange={this.handleThumbnail}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="upload-mini-player edmp">
            <div className="description-mini-player-container edv">
              <video src={videoUrl} controls></video>
            </div>
            <div className="video-info">
              <p>Filename</p>
              <h4>{fileName}</h4>
            </div>
          </section>
        </section>
      </div>
    );
  }
}

export default VideoEdit;
