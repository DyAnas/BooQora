import React from "react";
import axios from "axios";
import authHeader from "../Authentication/authHeader";
import {useHistory} from "react-router-dom";
const api_url = "http://localhost:8080/api/v1/zones/";
const api_url2 = "http://localhost:8080/api/v1/bookings/";
const api_url3 = "http://localhost:8080/api/v1/employees/email/";
const api_url4 = "http://localhost:8080/api/v1/employees/updateEmployee";

export async function FindEmployee(email) {

    const response = await axios.get(api_url3 + email,
        {
            headers: {
                Authorization: authHeader().Authorization,
            }
        })
    return response;
}


export async function UpgradeUserToAdmin(email,roleArray) {
    const response = await axios.post(api_url4,
        {
            email:email,
            role:roleArray
        },
        {
            headers: {
                Authorization: authHeader().Authorization,
            }
        })
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
    }).catch(error=> {
        if( error.status===401) {

            localStorage.clear()
          //  history.push("/");
            window.location.reload();
            alert("You have been inactive for a while. For your security, please sign in again");
        }
    })
    return response;
}

export async function CheckStatusOfAllFloorPeriod(from, to) {
    const response = await axios.post(api_url + "CheckStatusOfAllFloorPeriode", {
        from: from,
        to: to
    }, {
        headers: {
            Authorization: authHeader().Authorization,
        }
    })
    return response;
}

