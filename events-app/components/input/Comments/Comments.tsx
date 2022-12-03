import React, {FC, useEffect, useState} from 'react';

import s from './Comments.module.css'
import CommentList from "../CommentList/CommentList";
import NewComment from "../NewComment/NewComment";
import useSWR from "swr";
import {Comment} from "../../../data/events";

type CommentsProps = {
    eventId: string,
    comments: [Comment] | [] | undefined
}

export type AddCommentHandlerArgs = {
    email: string,
    name: string,
    text: string,
}

const Comments: FC<CommentsProps> = (props) => {
    const {eventId, comments} = props;

    const [loadedComments, setLoadedComments] = useState<[Comment] | [] | undefined>(comments)
    const [showComments, setShowComments] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    async function addCommentHandler(commentData: AddCommentHandlerArgs) {
        const response = await fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        // send data to API
    }

    const loadEventComments = async (url: string) => {
        const response = await fetch(url)
        const data = await response.json()
        return data.eventComments
    }

    const {data, error} = useSWR(`/api/comments/${eventId}`, loadEventComments)

    useEffect(() => {
        if (data) {
            setLoadedComments(data)
        }
    }, [data])

    if (!data && !error) return <p className="center">Loading...</p>

    return (
        <section className={s.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments ({loadedComments?.length})
            </button>
            {showComments && <CommentList comments={loadedComments}/>}
            {showComments && <NewComment onAddComment={addCommentHandler}/>}
        </section>
    );
};

export default Comments;