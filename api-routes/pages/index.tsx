import React, {FormEvent, FormEventHandler, useRef, useState} from 'react';
import {Feedback} from "../data/helpers";

const HomePage = () => {
    const [feedbackItems, setFeedbackItems] = useState<[Feedback] | []>([])
    const [loadedFeedbackDetails, setLoadedFeedbackDetails] = useState<{ id: string, email: string } | null>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const feedbackRef = useRef<HTMLTextAreaElement>(null)

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const reqBody = {
            email: emailRef.current?.value,
            feedback: feedbackRef.current?.value
        }

        const response = await fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        if (emailRef.current && feedbackRef.current) {
            emailRef.current.value = ""
            feedbackRef.current.value = ""
        }
        console.log(data)
    }

    const loadFeedBackHandler = async () => {
        const response = await fetch('/api/feedback')

        const feedbackData = await response.json()
        setFeedbackItems(feedbackData.feedback)
    }

    const showDetailsHandler = async (feedbackId: string) => {
        const loadSingleFeedbackItem = async () => {
            const response = await fetch(`/api/feedback/${feedbackId}`)
            const feedbackData = await response.json()
            const {id, email} = feedbackData.feedbackItem

            setLoadedFeedbackDetails({id, email})
        }

        if (!loadedFeedbackDetails) {
            await loadSingleFeedbackItem()
        }
        if (loadedFeedbackDetails && feedbackId !== loadedFeedbackDetails.id) {
            await loadSingleFeedbackItem()
        }

        if (loadedFeedbackDetails && feedbackId === loadedFeedbackDetails.id) {
            setLoadedFeedbackDetails(null)
        }

    }

    return (
        <div>
            <h1>The home page</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">email address</label>
                    <input type="email" id="email" ref={emailRef}/>
                </div>
                <div>
                    <label htmlFor="feedback">feedback</label>
                    <textarea id="feedback" rows={5} ref={feedbackRef}/>
                </div>

                <button>SUBMIT</button>
            </form>

            <hr/>

            <button onClick={loadFeedBackHandler}>
                Load feed back data
            </button>

            <ul>
                {
                    feedbackItems.length > 0 &&
                    feedbackItems.map((f, i) => {
                        return <li key={f.id} style={{border: '1px solid #ccc'}}>
                            <p>Feedback number: <b>{i + 1}</b></p>
                            <p>Feedback Text: {f.feedback}</p>
                            <button onClick={() => showDetailsHandler(f.id)}>
                                {
                                    loadedFeedbackDetails && loadedFeedbackDetails.id === f.id ?
                                        'Hide details' :
                                        'Show Details'
                                }
                            </button>
                            {(loadedFeedbackDetails && loadedFeedbackDetails.id === f.id) && <p>Email: {f.email}</p>}
                        </li>
                    })
                }
            </ul>

        </div>
    );
};

export default HomePage;