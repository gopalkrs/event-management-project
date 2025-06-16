import axios from "axios"

export const fetchEventsFilter = () => {
    const res = axios.get(`http://localhost:3000/api/events?eventType=concert,comedy`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}

export const fetchAllEvents = () => {
    const res = axios.get(`http://localhost:3000/api/events`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}

export const fetchSingleEvent = ({eventId} : {eventId : string}) => {
    const res = axios.get(`http://localhost:3000/api/events/${eventId}`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}