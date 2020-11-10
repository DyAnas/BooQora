import axios from "axios";
import AuthService from '../Authentication/authUser';

const api_url = "http://localhost:8080/api/v1/zones/";



export async function CheckStatusOfAllFloorPeriod ( from, to) {
    let token= AuthService.getCurrentUser().token;
    const response = await axios.post(api_url+"CheckStatusOfAllFloorPeriode", {
        from: from,
        to: to
    }, {
        headers:{
            Authorization: 'Bearer ' + token,
        }
    })
    return response;
}

