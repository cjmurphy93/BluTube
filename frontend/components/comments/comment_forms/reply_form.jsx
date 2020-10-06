import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class ReplyForm extends React.Component {
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
    this.props.closeForm();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { currentUser, videoId, createReply, comment, closeForm, openReplies } = this.props;

    if (comment.commentable_type !== 'Comment') {
    const reply = Object.assign(
      {},
      {
        author_id: currentUser.id,
        commentable_type: "Comment",
        commentable_id: comment.id,
      },
      { body: this.state.body }
    );
        createReply(reply).then(() => {
          closeForm();
          this.resetState();
          openReplies();
        });
    } else {
        const reply = Object.assign(
          {},
          {
            author_id: currentUser.id,
            commentable_type: "Comment",
            commentable_id: comment.commentable_id,
          },
          { body: this.state.body }
        );
        createReply(reply).then(() => {
        closeForm();
        this.resetState();
        openReplies();
        });
    }

  }

  render() {
    const { open, body } = this.state;
    const { comment, closeForm } = this.props;

    const commentButton = body.length ? (
      <button className="comment-btn" onClick={this.handleSubmit}>
        REPLY
      </button>
    ) : (
      <button className="comment-btn disabled">REPLY</button>
    );



    return (
      <div className="comment-form-container">
        <div className="comment-form">
          <FontAwesomeIcon className="reply-icon" icon={faUserCircle} />
          <textarea
            className="comment-textarea reply-area"
            cols="30"
            rows="10"
            placeholder="Add a public reply..."
            value={body}
            onChange={this.handleChange("body")}
            onClick={this.handleTextAreaClick}
          ></textarea>
        </div>
        <section className="comment-form-btns">
          <button className="comment-cancel" onClick={this.handleCancel}>
            CANCEL
          </button>
          {commentButton}
        </section>
      </div>
    );
  }
}

export default ReplyForm;
