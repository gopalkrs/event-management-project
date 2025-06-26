import axios from "axios";

export const fetchProfileDetails = async ({userId} : {userId : string}) => {
    const res = await axios.get(`/api/profile/${userId}`);
    if(!res) throw new Error("Error while fetching events");

    return res;
}