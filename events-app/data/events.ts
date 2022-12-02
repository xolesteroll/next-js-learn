const eventsDbUrl = 'https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/events.json'
export type Events = [Event]

type EventsGetterFunction = () => Promise<any[]>

export type DateFilterType = {
    year: number,
    month: number,
}

export type Event = {
    id: string,
    title: string,
    description: string,
    location: string,
    date: string,
    image: string,
    isFeatured: boolean,
}

export type Comment = {
    _id: string,
    eventId: string,
    email: string,
    name: string,
    text: string
}


export const fetchAndTransformFirebaseData = async (url = '') => {
    const data = await fetch(url ? url : eventsDbUrl)
    const fireBaseDataObj = await data.json()
    const transformedData = Object.keys(fireBaseDataObj).map(key => {
        return {
            id: key,
            ...fireBaseDataObj[key]
        }
    })

    return transformedData
}

export const getFeaturedEvents = async () => {
    const allEvents = await fetchAndTransformFirebaseData()
    return allEvents.filter((event) => event.isFeatured);
}

export const getEventById = async (id: string | string[] | undefined) => {
    const allEvents = await fetchAndTransformFirebaseData()
    return allEvents.find((event) => event.id === id)
}

export const getEventsByDate = async (year: number, month: number) => {
    const events = await fetchAndTransformFirebaseData()
    return events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    })
}

export const getEventsParamsArray = async (eventsGetter: EventsGetterFunction) => {
    const events = await eventsGetter()
    return events.map(e => {
        return {
            params: {
                eventId: e.id
            }
        }
    })
}