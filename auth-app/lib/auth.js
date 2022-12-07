export const createUser = async (userData) => {
    const responseData = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await responseData.json()

    if(!responseData.ok) {
        throw new Error(data.message || 'Something went wrong')
    }

    return data
}
