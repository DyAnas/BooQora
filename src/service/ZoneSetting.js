import axios from "axios";
import AuthService from '../Authentication/authUser';

const api_url = "http://localhost:8080/api/v1/zones/";

export async function ChangeZone(floor,zoneId, capacity, activated) {
    let token= AuthService.getCurrentUser().token;
    const response = await axios.post(api_url+"ZoneSettings", {
        floor: floor,
        zoneId: zoneId,
        capacity: capacity,
        activated: activated

    }, {
        headers:{
            Authorization: 'Bearer ' + token,
        }
    })
    return response;
}