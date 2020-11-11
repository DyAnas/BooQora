import axios from "axios";
import AuthService from '../Authentication/authUser';

const api_url = "http://localhost:8080/api/v1/zones/";
const api_url2 = "http://localhost:8080/api/v1/bookings/";

export async function getAllBookingOfEmployeeInAPeriod ( from, to) {
    let token= AuthService.getCurrentUser().token;
    const response = await axios.post(api_url2+"getAllBookingOfEmployeesInAPeriodAdmin", {
        from: from,
        to: to
    }, {
        headers:{
            Authorization: 'Bearer ' + token,
        }
    })
    return response;
}

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

