import path from "path";
import fs from "fs";

export const getDataFromFeedbackFile = () => {
    const dbFilePath = path.join(process.cwd(), 'data', 'feedback.json')
    const fileData = fs.readFileSync(dbFilePath)

    // @ts-ignore
    const parsedData = JSON.parse(fileData)

    return parsedData
}

export type Feedback = {
    id: string,
    email: string,
    feedback: string
}