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

    })
    return response;
}