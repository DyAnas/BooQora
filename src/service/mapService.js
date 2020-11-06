import axios from "axios";
import AuthService from '../Authentication/authUser';

const api_url = "http://localhost:8080/api/v1/";

/*

let token="";
if (AuthService.getCurrentUser().token !==null){
token = AuthService.getCurrentUser().token;
}
export async function getZoneList() {

    const response = await axios.get(api_url+'zones', {
        headers: {
            Authorization: 'Bearer ' +token
        }
    }).then((res) => {
        console.log(res.data)
    })
        .catch((error) => {
            console.error(error)
        });

    return response;


    }*/