import React, {FormEvent, useContext, useEffect, useState} from 'react';

import s from "./ContactForm.module.css"
import {sendContactFormData} from "../../../helpers/fetchers";
import {NotificationContext} from "../../../store/notificationContext";
import {ContactFormData} from "../../../types/fetchers";

const ContactForm = () => {
    const [enteredEmail, setEnteredEmail] = useState<string>("")
    const [enteredName, setEnteredName] = useState<string>("")
    const [enteredMessage, setEnteredMessage] = useState<string>("")
    const [isValid, setIsValid] = useState<boolean>(true)
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const notificationCtx = useContext(NotificationContext)

    useEffect(() => {
        if (
            enteredEmail.length < 5 ||
            enteredName.length < 2 ||
            enteredMessage.length < 5
        ) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }, [enteredName, enteredEmail, enteredMessage])

    const sendFeedbackHandler = async (feedbackData: ContactFormData) => {
        try {
            const response = await sendContactFormData(feedbackData)
            return response
        } catch (e: any) {
            notificationCtx.showNotification({
                title: "Error",
                message: "Bad request",
                status: "error"
            })
            return
        }
    }

    const clearFormFields = () => {
        setEnteredName("")
        setEnteredEmail("")
        setEnteredMessage("")
    }

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isValid) return

        const formValues = {
            email: enteredEmail,
            name: enteredName,
            message: enteredMessage
        }
        setIsFetching(true)
        notificationCtx.showNotification({
            title: "Sending...",
            message: "Your feedback is on it's way!",
            status: "pending"
        })
        const response = await sendFeedbackHandler(formValues)

        clearFormFields()
        setIsFetching(false)

        if (response && response.ok) {
            notificationCtx.showNotification({
                title: "Success",
                message: "Your feedback was successfully sent, thank you!",
                status: "success"
            })
        } else if (response && !response.ok) {
            const responseData = await response?.json()
            notificationCtx.showNotification({
                title: "Error",
                message: responseData.message || responseData.error,
                status: "error"
            })
        }

    }

    return (
        <section className={s.contact}>
            <h1>
                Can&apos;t wait for your feedback
            </h1>

            <form className={s.form} onSubmit={formSubmitHandler}>
                <div className={s.controls}>
                    <div className={s.control}>
                        <label htmlFor="email">Your email</label>
                        <input
                            type="email" id="email"
                            value={enteredEmail}
                            onChange={(e) => setEnteredEmail(e.currentTarget.value)}
                        />
                    </div>

                    <div className={s.control}>
                        <label htmlFor="name">Your name</label>
                        <input
                            type="text"
                            id="name"
                            value={enteredName}
                            onChange={(e) => setEnteredName(e.currentTarget.value)}
                        />
                    </div>
                </div>

                <div className={s.control}>
                    <label htmlFor="message">Leave me a message</label>
                    <textarea
                        id="message"
                        rows={5}
                        value={enteredMessage}
                        onChange={(e) => setEnteredMessage(e.currentTarget.value)}
                    />
                </div>

                <div className={s.actions}>
                    <button disabled={!isValid || isFetching}>
                        {
                            isFetching ?
                                "Sending..." :
                                "Send Message"
                        }
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ContactForm;