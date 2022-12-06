import React, {FormEvent, useEffect, useState} from 'react';

import s from "./ContactForm.module.css"
import {sendContactFormData} from "../../../helpers/fetchers";
import {NotificationObject} from "../../../types/fetchers";

const ContactForm = () => {
    const [enteredEmail, setEnteredEmail] = useState<string>("")
    const [enteredName, setEnteredName] = useState<string>("")
    const [enteredMessage, setEnteredMessage] = useState<string>("")
    const [isValid, setIsValid] = useState<boolean>(true)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [notification, setNotification] = useState<NotificationObject>({show: false, message: ""})
    const [responseSuccessClass, setResponseSuccessClass] = useState<string>("success")

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
        const response = await sendContactFormData(formValues)
        response.ok ? setResponseSuccessClass("success") : setResponseSuccessClass("error")

        const responseData = await response.json()
        setNotification({show: true, message: responseData.message || responseData.error})

        const notificationTimeout = setTimeout(() => {
            setNotification({show: false, message: ""})
            clearTimeout(notificationTimeout)
        }, 3000)

        clearFormFields()
        setIsFetching(false)
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

                {notification.show && <p className={`${s.notification} ${s[responseSuccessClass]}`}>{notification.message}</p>}
            </form>
        </section>
    );
};

export default ContactForm;