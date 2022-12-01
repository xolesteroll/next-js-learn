import React from 'react';
import {Feedback, getDataFromFeedbackFile} from "../../data/helpers";
import {NextPage} from "next";


const FeedbackPage: NextPage<{ feedback: [Feedback] }> = (props) => {
    const feedback = props.feedback

    return (
        <div>
            <ul>
                {
                    feedback.length > 0 ?
                    feedback.map((f, i) => {
                        return <li key={f.id}>
                            <p>Feedback number: <b>{i + 1}</b></p>
                            <p>Email: {f.email}</p>
                            <p>Feedback Text: {f.feedback}</p>
                        </li>
                    }) : <p>No feedback yet</p>
                }
            </ul>
        </div>
    );
};

export const getStaticProps = async () => {
    const feedbackData = getDataFromFeedbackFile()

    return {
        props: {
            feedback: feedbackData
        }
    }
}

export default FeedbackPage;