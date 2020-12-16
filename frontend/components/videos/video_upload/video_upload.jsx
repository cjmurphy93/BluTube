import React from "react";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";

class CreateVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.video;

    this.handleFile = this.handleFile.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleThumbnail = this.handleThumbnail.bind(this);
  }

  // componentDidMount() {
  //     document.title = "Create a video";
  // }

  handleInput(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length >= 1) {
      const file = e.dataTransfer.files[0];
      const fileType = file.type.split("/")[0];
      if (fileType != "video") {
        this.setState({ fileError: true });
      } else {
        this.setState({ fileError: false });
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
          this.setState({
            title: file.name,
            videoFile: file,
            videoUrl: fileReader.result,
          });
        };
      }
    } else {
      this.setState({ videoFile: null, videoUrl: "" });
    }
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  findFileInput() {
    document.getElementById("file").click();
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        this.setState({
          title: file.name,
          videoFile: file,
          videoUrl: fileReader.result,
        });
      };
    } else {
      this.setState({ videoFile: null, videoUrl: "" });
    }
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
    } else {
      this.setState({ thumbnailFile: null, thumbnailUrl: "" });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ waiting: true });
    const formData = new FormData();
    formData.append("video[title]", this.state.title);
    formData.append("video[description]", this.state.description);
    formData.append("video[creator_id]", this.props.currentUser.id);
    if (this.state.videoFile) {
      formData.append("video[video_file]", this.state.videoFile);
    }
    if (this.state.thumbnailFile) {
      formData.append("video[thumbnail]", this.state.thumbnailFile);
    }
    this.props.createVideo(formData).then((video) => {
      this.props.history.push(`/videos/${video.video.id}`);
      this.props.closeModal();
    });
  }

  render() {
    const {
      title,
      videoFile,
      videoUrl,
      thumbnailFile,
      thumbnailUrl,
      fileError,
      waiting,
    } = this.state;
    const { closeModal } = this.props;

    const currentStep = !videoUrl ? (
      <Step1
        handleDragOver={this.handleDragOver}
        handleDrop={this.handleDrop}
        handleFile={this.handleFile}
        findFileInput={this.findFileInput}
        fileError={fileError}
        closeModal={closeModal}
      />
    ) : (
      <Step2
        title={title}
        fileName={videoFile.name}
        videoUrl={videoUrl}
        waiting={waiting}
        findFileInput={this.findFileInput}
        handleThumbnail={this.handleThumbnail}
        handleInput={this.handleInput}
        handleSubmit={this.handleSubmit}
        closeModal={closeModal}
      />
    );

    return <div className="video-upload-form">{currentStep}</div>;
  }
}

export default CreateVideo;
