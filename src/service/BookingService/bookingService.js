import axios from "axios";
import AuthService from '../Authentication/authUser';

const api_url = "http://localhost:8080/api/v1/bookings/";



export async function getAllBookingOfEmployeeInAPeriodEmployee(email, from, to) {
    let token = AuthService.getCurrentUser().token;
    const response = await axios.post(api_url + "getAllBookingOfEmployeeInAPeriod", {
        email: email,
        from: from,
        to: to
    }, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
    return response;
}
export async function DeleteBookings(bookingId) {
    let token = AuthService.getCurrentUser().token;
    const response = await axios.post(api_url + "deleteBooking", {
        bookingId: bookingId
    }, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
    return response;
}


