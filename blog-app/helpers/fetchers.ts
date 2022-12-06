import {ContactFormData} from "../types/fetchers";

export const sendContactFormData = async (contactFormData: ContactFormData) => {
    const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(contactFormData),
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response
}