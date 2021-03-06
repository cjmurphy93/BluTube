import React from "react";
import ReplyForm from "./comment_forms/reply_form_container";
import ReplyIndex from "./reply_index";
import CommentLikes from "../likes/comment_likes/comment_likes_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repliesOpen: false,
      replyFormOpen: false,
    };

    this.openReplies = this.openReplies.bind(this);
    this.toggleViewReplies = this.toggleViewReplies.bind(this);
    this.openReplyForm = this.openReplyForm.bind(this);
    this.closeReplyForm = this.closeReplyForm.bind(this);
    this.hashCode = this.hashCode.bind(this);
    this.intToRGB = this.intToRGB.bind(this);
  }

  openReplies() {
    this.setState({ repliesOpen: false });
    this.setState({ repliesOpen: true });
  }

  toggleViewReplies(e) {
    this.setState({ repliesOpen: !this.state.repliesOpen });
  }

  openReplyForm(e) {
    this.setState({ replyFormOpen: true });
  }

  closeReplyForm() {
    this.setState({ replyFormOpen: false });
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
    const { comment, isReply, currentUser } = this.props;
    if (!comment.author) return null;
    const { repliesOpen, replyFormOpen } = this.state;
    const replyLength = comment.replies ? comment.replies.length : 0;
    const hasReplies = replyLength ? true : false;
    const iconClass = isReply ? "reply-icon" : "comment-icon-1";

    let replyMessage;
    let iconType;

    if (!repliesOpen) {
      replyMessage =
        replyLength === 1 ? "View Reply" : `View ${replyLength} replies`;
      iconType = faCaretDown;
    } else {
      replyMessage =
        replyLength === 1 ? "Hide Reply" : `Hide ${replyLength} replies`;
      iconType = faCaretUp;
    }

    const viewRepliesRender = hasReplies ? (
      <div className="show-replies" onClick={this.toggleViewReplies}>
        <FontAwesomeIcon icon={iconType} className="show-replies-caret" />
        <p>{replyMessage}</p>
      </div>
    ) : (
      <></>
    );

    const repliesRender =
      repliesOpen && comment.replies ? (
        <ReplyIndex key={comment.id} replies={comment.replies} />
      ) : (
        <></>
      );

    const replyFormRender = replyFormOpen ? (
      <div className="outer-reply-form">
        <ReplyForm
          comment={comment}
          closeForm={this.closeReplyForm}
          openReplies={this.openReplies}
        />
      </div>
    ) : (
      <></>
    );

    const creatorName =
      comment.author.first_name.trim() + comment.author.last_name.trim();
    const nameColor = this.intToRGB(this.hashCode(creatorName));
    const iconStyle = {
      backgroundColor: `#${nameColor}`,
    };

    const commentIcon = comment.author.profilePicUrl ? (
      <div className={`comment-top-pro-pic-wrapper ${iconClass}`}>
        <img
          src={comment.author.profilePicUrl}
          className={`comment-top-pro-pic ${iconClass}`}
          // onClick={this.handleClick}
        />
      </div>
    ) : (
      <div
        className={`comment-top-author-initial ${iconClass}`}
        style={iconStyle}
      >
        <p>{comment.author.first_name[0]}</p>
      </div>
    );

    return (
      <li className="comment">
        <div className="comment-main">
          {/* <FontAwesomeIcon className={iconClass} icon={faUserCircle} /> */}
          {commentIcon}
          <div className="comment-content">
            <div className="comment-info">
              <h4>
                {comment.author.first_name} {comment.author.last_name}
              </h4>
            </div>
            <p className="comment-body">{comment.body}</p>
            <div className="likes-and-reply">
              <CommentLikes comment={comment} />
              <button className="like-reply-btn" onClick={this.openReplyForm}>
                REPLY
              </button>
            </div>
          </div>
        </div>
        <div className="comment-footer">
          {replyFormRender}
          {viewRepliesRender}
          {repliesRender}
        </div>
      </li>
    );
  }
}

export default CommentIndexItem;
