import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentUser;
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentuser.id);
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
}

export default ProfileEdit;
