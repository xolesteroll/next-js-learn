import React, {FormEvent, FormEventHandler} from 'react';

import s from './NewsletterRegistration.module.css'

const NewsletterRegistration = () => {
    function registrationHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

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
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
};

export default NewsletterRegistration;