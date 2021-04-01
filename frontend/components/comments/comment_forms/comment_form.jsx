import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      author_id: "",
      commentable_type: "",
      commentable_id: "",
      open: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleTextAreaClick = this.handleTextAreaClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hashCode = this.hashCode.bind(this);
    this.intToRGB = this.intToRGB.bind(this);
  }

  handleChange(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  resetState() {
    this.setState({
      body: "",
      author_id: "",
      commentable_type: "",
      commentable_id: "",
      open: false,
    });
  }

  handleTextAreaClick(e) {
    e.preventDefault();
    const { currentUser, history } = this.props;

    if (currentUser) {
      this.setState({ open: true });
    } else {
      history.push("/signin");
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.resetState();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { currentUser, videoId, createComment } = this.props;

    const comment = Object.assign(
      {},
      {
        author_id: currentUser.id,
        commentable_type: "Video",
        commentable_id: videoId,
      },
      { body: this.state.body }
    );

    createComment(comment);
    this.resetState();
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
    const { open, body } = this.state;

    const commentButton = body.length ? (
      <button className="comment-btn" onClick={this.handleSubmit}>
        COMMENT
      </button>
    ) : (
      <button className="comment-btn disabled">COMMENT</button>
    );

    const formOpen = open ? (
      <section className="comment-form-btns">
        <button className="comment-cancel" onClick={this.handleCancel}>
          CANCEL
        </button>
        {commentButton}
      </section>
    ) : (
      <></>
    );

    var iconStyle;
    if (this.props.currentUser) {
      const userName =
        this.props.currentUser.first_name.trim() +
        this.props.currentUser.last_name.trim();
      const nameColor = this.intToRGB(this.hashCode(userName));
      iconStyle = {
        color: `#${nameColor}`,
      };
    }
    var commentIcon;

    if (this.props.currentUser) {
      if (this.props.currentUser.profilePicUrl) {
        commentIcon = (
          <div className="comment-top-pro-pic-wrapper ctppw">
            <img
              src={this.props.currentUser.profilePicUrl}
              className="comment-top-pro-pic"
              // onClick={this.handleClick}
            />
          </div>
        );
      } else {
        commentIcon = (
          <div className="comment-top-creator-initial" style={iconStyle}>
            <p>{this.props.currentUser.first_name[0]}</p>
          </div>
        );
      }
    } else {
      commentIcon = (
        <FontAwesomeIcon className="comment-icon" icon={faUserCircle} />
      );
    }

    return (
      <div className="comment-form-container">
        <div className="comment-form">
          {commentIcon}
          <textarea
            className="comment-textarea"
            cols="30"
            rows="10"
            placeholder="Add a public comment..."
            value={body}
            onChange={this.handleChange("body")}
            onClick={this.handleTextAreaClick}
          ></textarea>
        </div>
        {formOpen}
      </div>
    );
  }
}

export default CommentForm;
