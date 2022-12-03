import React, {FormEvent, FormEventHandler, useRef, useState} from 'react';

import s from './NewsletterRegistration.module.css'

const NewsletterRegistration = () => {
    const [infoMessage, setInfoMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [enteredEmail, setEnteredEmail] = useState<string>("")

    const emailInputHandler = (e: FormEvent<HTMLInputElement>) => {
        setEnteredEmail(e.currentTarget.value)
    }

    async function registrationHandler(event: FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        event.preventDefault();
        const email = enteredEmail

        const response = await fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({email}),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (response.status === 200) {
            setInfoMessage("Successfully registered! Thank you!")

        } else {
            setInfoMessage("Something went wrong, please try again")
        }

        setEnteredEmail("")
        setIsLoading(false)

        const infoMessageTimeout = setTimeout(() => {
            setInfoMessage("")
            clearTimeout(infoMessageTimeout)
        }, 3000)
    }

    return (
        <section className={s.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={s.control}>
                    <input
                        type='email'
                        id='email'
                        value={enteredEmail}
                        onChange={emailInputHandler}
                        placeholder='Your email'
                        aria-label='Your email'
                    />
                    <button disabled={isLoading || enteredEmail.length < 5}>{isLoading ? "Sending..." : "Register"}</button>
                </div>
            </form>
            {
                infoMessage && <p className="center">{infoMessage}</p>
            }

        </section>
    );
};

export default NewsletterRegistration;