import React from 'react';
import CommentIndexItem from './comment_index_item';

class ReplyIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            replies: Object.values(this.props.replies)
        };
    };

    render() {
        const { replies } = this.state;
        const replyLis = replies.map((reply) => (
            <CommentIndexItem key={reply.id} comment={reply} isReply={true} />
        ));

        return (
            <ul className='reply-index'>
                {replyLis}
            </ul>
        )
    }
}

export default ReplyIndex;