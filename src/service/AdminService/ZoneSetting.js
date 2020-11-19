import axios from "axios";
import authHeader from "../Authentication/authHeader";


const api_url = "http://localhost:8080/api/v1/zones/";
export async function ChangeZone(floor,zoneId, capacity, activated) {

    const response = await axios.post(api_url+"ZoneSettings", {
        floor: floor,
        zoneId: zoneId,
        capacity: capacity,
        activated: activated

    }, {
        headers:{
            Authorization: authHeader().Authorization,
        }
    }).catch(error=> {
        if( error.response.status===401) {
            localStorage.clear()
            window.location.reload();
            alert("You have been inactive for a while. For your security, please sign in again");
        }

        return error;
    })
    return response;
}