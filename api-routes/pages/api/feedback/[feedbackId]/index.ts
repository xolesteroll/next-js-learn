import {NextApiHandler} from "next";
import {Feedback, getDataFromFeedbackFile} from "../../../../data/helpers";

const handler: NextApiHandler = async (req, res) => {
    const feedbackId = req.query.feedbackId
    const feedbackData = getDataFromFeedbackFile()

    const foundFeedback = feedbackData.find((f: Feedback) => f.id === feedbackId)

    res.status(201).json({message: "found you feedback", feedbackItem: foundFeedback})
}

export default handler