import axios from "axios";
import authHeader from "../Authentication/authHeader";


const api_url = "http://localhost:8080/api/v1/zones/";
const api_url2 = "http://localhost:8080/api/v1/bookings/";
const api_url3 = "http://localhost:8080/api/v1/employees/email/";
const api_url4 = "http://localhost:8080/api/v1/employees/updateEmployee";

/* istanbul ignore next */
export async function FindEmployee(email) {

    const response = await axios.get(api_url3 + email,
        {
            headers: {
                Authorization: authHeader().Authorization,
            }
        }
    )
    return response;
}

/* istanbul ignore next */
export async function UpgradeUserToAdmin(email, roleArray) {
    const response = await axios.post(api_url4,
        {
            email: email,
            role: roleArray
        },
        {
            headers: {
                Authorization: authHeader().Authorization,
            }

        }
    )
    return response;
}



export async function getAllBookingOfEmployeeInAPeriod(from, to) {

    const response = await axios.post(api_url2 + "getAllBookingOfEmployeesInAPeriodAdmin", {
        from: from,
        to: to
    }, {
        headers: {
            Authorization: authHeader().Authorization,
        }
    }).catch(error => {
        /* istanbul ignore next */
        if (error.response.status === 401) {
            localStorage.clear()
            window.location.reload();
            alert("You have been inactive for a while. For your security, please sign in again");
        }

        return error;
    })
    return response;
}


export async function CheckStatusOfAllFloorPeriod(from, to) {
    const response = await axios.post(api_url + "CheckStatusOfAllFloorPeriod", {
        from: from,
        to: to
    }, {
        headers: {
            Authorization: authHeader().Authorization,
        }
    }).catch(error => {
        /* istanbul ignore next */
        if (error.response.status === 401) {
            localStorage.clear()
            window.location.reload();
            alert("You have been inactive for a while. For your security, please sign in again");
        }

        return error;
    }
    )
    return response;
}

