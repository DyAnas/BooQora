import axios from "axios";
import AuthService from '../Authentication/authUser';

const api_url = "http://localhost:8080/api/v1/zones/";
const api_url2 = "http://localhost:8080/api/v1/bookings/";
const api_url3 = "http://localhost:8080/api/v1/employees/email/";
const api_url4 = "http://localhost:8080/api/v1/employees/updateEmployee";

export async function FindEmployee(email) {

    let token = AuthService.getCurrentUser().token;

    const response = await axios.get(api_url3 + email,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    return response;
}


export async function UpgradeUserToAdmin(email,roleArray) {

    let token = AuthService.getCurrentUser().token;

    const response = await axios.post(api_url4,
        {
            email:email,
            role:roleArray
        },
        {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    return response;
}



export async function getAllBookingOfEmployeeInAPeriod(from, to) {
    let token = AuthService.getCurrentUser().token;

    console.log("from",from)
    console.log("to",to)
    const response = await axios.post(api_url2 + "getAllBookingOfEmployeesInAPeriodAdmin", {
        from: from,
        to: to
    }, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
    return response;
}

export async function CheckStatusOfAllFloorPeriod(from, to) {
    let token = AuthService.getCurrentUser().token;
    const response = await axios.post(api_url + "CheckStatusOfAllFloorPeriode", {
        from: from,
        to: to
    }, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
    return response;
}

