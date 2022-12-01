import React, {FC, useState} from 'react';

import s from './Comments.module.css'
import CommentList from "../CommentList/CommentList";
import NewComment from "../NewComment/NewComment";

type CommentsProps = {
    eventId: string
}

export type AddCommentHandlerArgs = {
    email: string,
    name: string,
    text: string,
}

const Comments: FC<CommentsProps> = (props) => {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData: AddCommentHandlerArgs) {
        // send data to API
    }

    return (
        <section className={s.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList />}
        </section>
    );
};

export default Comments;