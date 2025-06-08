import axios from "axios"

export const fetchEvents = () => {
    const res = axios.get(`http://localhost:3000/api/events`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}