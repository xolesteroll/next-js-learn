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
        const [isLoading, setIsLoading] = useState<boolean>(false)

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
            return response.status
            // send data to API
        }

        const loadEventComments = async (url: string) => {
            const response = await fetch(url)
            const data = await response.json()
            return data.eventComments
        }

        // const {data, error} = useSWR(`/api/comments/${eventId}`, loadEventComments)


        useEffect(() => {
            if (showComments) {
                setIsLoading(true)
                loadEventComments(`/api/comments/${eventId}`).then(data => {
                    setLoadedComments(data)
                    setIsLoading(false)
                })
            }
        }, [showComments])

        return (
            <section className={s.comments}>
                <button onClick={toggleCommentsHandler}>
                    {showComments ? 'Hide' : 'Show'} Comments ({loadedComments?.length})
                </button>
                {isLoading && <p className="center">Loading...</p>}
                {(showComments && !isLoading) && <CommentList comments={loadedComments}/>}
                {showComments && <NewComment onAddComment={addCommentHandler}/>}
            </section>
        );
    }
;

export default Comments;