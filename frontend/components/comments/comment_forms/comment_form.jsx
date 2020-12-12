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

    return (
      <div className="comment-form-container">
        <div className="comment-form">
          <FontAwesomeIcon className="comment-icon" icon={faUserCircle} />
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
