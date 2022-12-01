import React, {FormEvent, FormEventHandler, useRef} from 'react';

import s from './NewsletterRegistration.module.css'

const NewsletterRegistration = () => {
    const emailRef = useRef<HTMLInputElement>(null)

    async function registrationHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = emailRef.current?.value

        const response = await fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({email}),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const responseData = await response.json()
        console.log(responseData)
        // fetch user input (state or refs)
        // optional: validate input
        // send valid data to API
    }

    return (
        <section className={s.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={s.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        ref={emailRef}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
};

export default NewsletterRegistration;