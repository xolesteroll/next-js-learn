import React, {FC, useState} from 'react';
import {Comment} from "../../../data/events";

import s from './CommentList.module.css'

type CommentListProps = {
    comments: [Comment] | [] | undefined
}

const CommentList: FC<CommentListProps> = ({comments}) => {
    const [eventComments, setEventComments] = useState(comments)

    return (
        <ul className={s.comments}>
            {
                eventComments && eventComments.map(c => {
                    return <li key={c._id}>
                        <p>{c.text}</p>
                        <div>
                            By <address>{c.name}</address>
                        </div>
                    </li>
                })
            }
        </ul>
    );
};

export default CommentList;