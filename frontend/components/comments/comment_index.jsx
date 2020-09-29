import React from 'react';
import CommentForm from './comment_forms/comment_form_container';
import CommentIndexItem from './comment_index_item';

class CommentIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments
        };
    };

    componentDidMount() {
        const { currentVideoId, fetchComments } = this.props;
        fetchComments(currentVideoId);
    };

    render() {
        const comments = Object.values(this.props.comments);
        let commentCount = comments.length;
        comments.forEach(comment => commentCount += comment.replyCount);

        const commentLis = comments.map((comment) => (
            <CommentIndexItem key={comment.id} comment={comment} currentUser={this.props.currentUser} />
        ));

        return (
            <div className='comment-index'>
                <div className='comment-index-header'>
                    <h1>{commentCount} Comments</h1>
                    <CommentForm />
                </div>
                <ul className='comment-list'>
                    {commentLis}
                </ul>
            </div>
        )
    }
}