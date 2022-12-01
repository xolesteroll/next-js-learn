import {NextApiHandler} from "next";
import fs from "fs";
import path from "path"

const handler: NextApiHandler = (req, res) => {
    const dbFilePath = path.join(process.cwd(), 'data', 'feedback.json')
    const fileData = fs.readFileSync(dbFilePath)

    // @ts-ignore
    const parsedData = JSON.parse(fileData)

    if (req.method === 'POST') {
        const email = req.body.email
        const feedback = req.body.feedback

        //constructing a new feedback object to be stored in the db file
        const newFeedback = {
            id: new Date().toISOString(),
            email,
            feedback
        }

        //store new feedback object in our db file

        parsedData.push(newFeedback)
        fs.writeFileSync(dbFilePath, JSON.stringify(parsedData))

        return res.status(201).json({message: "Your feedback was saved successfully!", feedback: newFeedback})
    }

    return res.status(200).json({message: "Requested all feedback", feedback: parsedData})
}

export default handler