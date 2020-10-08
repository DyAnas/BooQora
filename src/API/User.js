import axios from 'axios';


export async function adduser(value){
    const response = await axios.post('http://localhost:8080/api/v1/employees', value);
    return response;
}