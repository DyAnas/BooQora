import axios from "axios";


const api_url = "http://localhost:8080/api/v1/employees/";

class AuthService {
    login(email, password) {
        return axios
            .post(api_url + "signin", {
                email,
                password
            })
            .then(Response => {
                if (Response.data.accessToken) {

                    localStorage.setItem("user", JSON.stringify(Response.data));
                }
                return Response.data;
            });
    }


    logout = () => {
        localStorage.removeItem("user");
    }

    
    register(firstName, lastName, email, password,role) {
        return axios.post(api_url + "signup", {
            firstName,
            lastName,
            email,
            password,
            role
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

}

export default new AuthService();

