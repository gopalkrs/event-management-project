import axios from "axios"

export const fetchEventsFilter = () => {
    const res = axios.get(`/api/events?eventType=concert,comedy`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}
export const fetchMeetupEvents = () => {
    const res = axios.get(`/api/events?eventType=meetups`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}
export const fetchRecentMusicEvents = () => {
    const res = axios.get(`/api/events?eventType=concert&recent=true`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}

export const fetchSportsFilter = () => {
    const res = axios.get(`/api/events?eventType=sports`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}
export const fetchActivitiesFilter = () => {
    const res = axios.get(`/api/events?eventType=activities`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}
export const fetchRecentEvents = () => {
    const res = axios.get(`/api/events?recent=true`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}

export const fetchAllEvents = () => {
    const res = axios.get(`/api/events`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}

export const fetchSingleEvent = async ({eventId} : {eventId : string}) => {
    const res = await axios.get(`/api/events/${eventId}`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}