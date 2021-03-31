import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentUser;
    this.findFileInput = this.findFileInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleProfilePic = this.handleProfilePic.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }

  handleUndo(e) {
    e.preventDefault();
    if (
      this.state !== this.props.currentUser &&
      this.state.id === this.props.currentUser.id
    ) {
      this.setState(this.props.currentUser);
      if (!this.props.currentUser.profilePicUrl) {
        this.setState({ profilePicFile: undefined, profilePicUrl: undefined });
      }
    }
  }

  handleInput(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  findFileInput() {
    document.getElementById("file").click();
  }

  handleProfilePic(e) {
    const file = e.currentTarget.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        this.setState({
          profilePicFile: file,
          profilePiclUrl: fileReader.result,
        });
      };
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = new FormData();
    if (this.state.profilePicFile) {
      user.append("user[profilePic]", this.state.profilePicFile);
    }

    this.props.updateUser(user, this.props.currentUser.id).then(() => {
      return this.props.history.push(`/`);
    });
  }

  render() {
    if (!this.props.currentUser || this.props.currentUser.id !== this.state.id)
      return null;

    const { profilePicFile, profilePicUrl } = this.state;

    const publishButton =
      this.props.currentUser.id === this.state.id &&
      profilePicUrl !== this.props.profilePicUrl ? (
        <button className="publish save-btn" onClick={this.handleSubmit}>
          SAVE
        </button>
      ) : (
        <></>
      );

    const profilePic = profilePicUrl ? (
      <img
        src={profilePicUrl}
        alt="thumbnail"
        className="thumbnail-preview"
        onClick={this.findFileInput}
      />
    ) : (
      <div className="thumbnail-upload-button" onClick={this.findFileInput}>
        <FontAwesomeIcon className="thumbnail-icon" icon={faImage} />
        <span>Upload profile picture</span>
      </div>
    );

    const undoBtn =
      this.props.currentUser.id === this.state.id &&
      profilePicUrl !== this.props.profilePicUrl ? (
        <button className="publish undo-btn" onClick={this.handleUndo}>
          UNDO CHANGES
        </button>
      ) : (
        <button className="publish undo-btn-disabled">UNDO CHANGES</button>
      );

    return (
      <div className="edit-video">
        <div className="edit-top">
          <div className="edit-top-inner">
            <div className="edit-top-bottom">
              <h2>Profile details</h2>
              <div className="edit-buttons">
                {undoBtn}
                {publishButton}
              </div>
            </div>
          </div>
        </div>

        <section id="edc-2" className="upload-content-2 edc-2">
          <section className="upload-details edd-2">
            <div className="thumbnail-upload-form">
              <h3>Profile Picture</h3>
              <p>Select or upload a picture</p>
              <div className="thumbnail-previews">
                <div className="thumbnail-upload-container">
                  {profilePic}
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".jpg"
                    onChange={this.handleProfilePic}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    );
  }
}

export default ProfileEdit;
