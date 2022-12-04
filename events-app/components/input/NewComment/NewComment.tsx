import React, {FC, FormEvent, useContext, useState} from 'react';

import s from './NewComment.module.css'
import {AddCommentHandlerArgs} from "../Comments/Comments";
import {NotificationContext} from "../../../store/notification-context";

type AddCommentHandler = (args: AddCommentHandlerArgs) => Promise<number>

type NewCommentProps = {
    onAddComment: AddCommentHandler
}

const NewComment: FC<NewCommentProps> = (props) => {
    const [isInvalid, setIsInvalid] = useState<boolean>(true);
    const [enteredEmail, setEnteredEmail] = useState<string>("")
    const [enteredName, setEnteredName] = useState<string>("")
    const [enteredComment, setEnteredComment] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [responseInfo, setResponseInfo] = useState<string>("")

    const notificationCtx = useContext(NotificationContext)

    const clearFormFields = () => {
        setEnteredEmail("")
        setEnteredName("")
        setEnteredComment("")
    }

    async function sendCommentHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true)

        notificationCtx.showNotification({
            title: "Processing...",
            message: "Adding your comment",
            status: "pending"
        })
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
            notificationCtx.showNotification({
                title: "Wrong data",
                message: "Please enter valid data",
                status: "error"
            })
            return;
        } else {
            setIsInvalid(false)
        }

        const responseCode = await props.onAddComment({
            email: enteredEmail,
            name: enteredName,
            text: enteredComment,
        });


        if (responseCode === 200) {
            setResponseInfo("Your comments was successfully added, thank you!")
            notificationCtx.showNotification({
                title: "Success",
                message: "We've  added your comment, thank you!",
                status: "success"
            })
        } else {
            setResponseInfo("Something went wrong, please check entered data, or try again later")
            notificationCtx.showNotification({
                title: "Error",
                message: "Something went wrong...",
                status: "error"
            })
        }

        const noticeTimeout = setTimeout(() => {
            setResponseInfo("")
            clearTimeout(noticeTimeout)
        }, 3000)

        clearFormFields()
        setIsLoading(false)
    }

    return (
        <>
            <form className={s.form} onSubmit={sendCommentHandler}>
                <div className={s.row}>
                    <div className={s.control}>
                        <label htmlFor='email'>Your email</label>
                        <input type='email'
                               id='email'
                               value={enteredEmail}
                               onChange={(e) => setEnteredEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div className={s.control}>
                        <label htmlFor='name'>Your name</label>
                        <input type='text' id='name' value={enteredName}
                               onChange={(e) => setEnteredName(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className={s.control}>
                    <label htmlFor='comment'>Your comment</label>
                    <textarea id='comment' rows={5} value={enteredComment}
                              onChange={(e) => setEnteredComment(e.currentTarget.value)}
                    ></textarea>
                </div>
                <button disabled={isLoading}>{isLoading ? "Sending..." : "Submit"}</button>
                {responseInfo && <p className="center">{responseInfo}</p>}
            </form>
        </>
    );
};

export default NewComment;