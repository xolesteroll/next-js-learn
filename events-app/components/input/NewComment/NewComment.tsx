import React, {FC, FormEvent, FormEventHandler, useRef, useState} from 'react';

import s from './NewComment.module.css'
import {AddCommentHandlerArgs} from "../Comments/Comments";

type AddCommentHandler = (args: AddCommentHandlerArgs) => void

type NewCommentProps = {
    onAddComment: AddCommentHandler
}

const NewComment: FC<NewCommentProps> = (props) => {
    const [isInvalid, setIsInvalid] = useState(false);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const commentInputRef = useRef<HTMLTextAreaElement>(null);

    function sendCommentHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current?.value;
        const enteredName = nameInputRef.current?.value;
        const enteredComment = commentInputRef.current?.value;

        if (
            !enteredEmail ||
            enteredEmail.trim() === '' ||
            !enteredEmail.includes('@') ||
            !enteredName ||
            enteredName.trim() === '' ||
            !enteredComment ||
            enteredComment.trim() === ''
        ) {
            setIsInvalid(true);
            return;
        }

        props.onAddComment({
            email: enteredEmail,
            name: enteredName,
            text: enteredComment,
        });

        emailInputRef.current.value = ""
        nameInputRef.current.value = ""
        commentInputRef.current.value = ""


    }

    return (
        <form className={s.form} onSubmit={sendCommentHandler}>
            <div className={s.row}>
                <div className={s.control}>
                    <label htmlFor='email'>Your email</label>
                    <input type='email' id='email' ref={emailInputRef} />
                </div>
                <div className={s.control}>
                    <label htmlFor='name'>Your name</label>
                    <input type='text' id='name' ref={nameInputRef} />
                </div>
            </div>
            <div className={s.control}>
                <label htmlFor='comment'>Your comment</label>
                <textarea id='comment' rows={5} ref={commentInputRef}></textarea>
            </div>
            {isInvalid && <p>Please enter a valid email address and comment!</p>}
            <button>Submit</button>
        </form>
    );
};

export default NewComment;