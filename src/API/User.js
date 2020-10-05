import axios from 'axios';


export async function adduser(value){
    const response = await axios.post('http://localhost:8080/lagre', value);
    return response;
}