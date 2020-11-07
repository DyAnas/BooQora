import axios from "axios";
import AuthService from '../Authentication/authUser';

const api_url = "http://localhost:8080/api/v1/zones/floor/";
const api_url2="http://localhost:8080/api/v1/zones/"
const api_url3 = "http://localhost:8080/api/v1/"



export async function getZoneList(floor) {
    console.log("floor: "+floor)
    let token= AuthService.getCurrentUser().token;
    const response = await axios.get(api_url+floor, {
        headers: {
            Authorization: 'Bearer ' + token
        }

    })
    return response;
    }

export async function checkStatusOfAZoneOnADay(zoneId, date) {
    console.log("zoneId: "+zoneId)
    let token= AuthService.getCurrentUser().token;
    const response = await axios.post(api_url2, {

           // Authorization: 'Bearer ' + token,
            zoneId: 1,
            date: date


    }, {
        headers:{
            Authorization: 'Bearer ' + token,
        }
    })
    return response;
}
export async function BookPlass(date, employeeId, zoneId ) {
    let token= AuthService.getCurrentUser().token;
    const response = await axios.post(api_url3+"bookings/book", {
        // Authorization: 'Bearer ' + token,
        date: date,
        employeeId: employeeId,
        zoneId:zoneId

    }, {
        headers:{
            Authorization: 'Bearer ' + token,
        }
    })
    return response;
}
export async function CheckStatusOfAllZones(floorId,date ) {
    let token= AuthService.getCurrentUser().token;
    const response = await axios.post(api_url2+"checkStatusOfAllZoneInAFloor", {
        // Authorization: 'Bearer ' + token,
        floorId: floorId,
        date: date,
    }, {
        headers:{
            Authorization: 'Bearer ' + token,
        }
    })
    return response;
}
