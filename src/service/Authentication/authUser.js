import axios from "axios";
import authHeader from "./authHeader";

const api_url = "http://localhost:8080/api/v1/employees/";
const api_url2 = "http://localhost:8080/";
class AuthService {

    login(email, password) {

        return axios
            .post(api_url + "signin", {
                email,
                password
            })
            .then(Response => {
                if (Response.data.token) {
                    localStorage.setItem("user", JSON.stringify(Response.data));
                    console.log(authHeader().Authorization)
                }
                return Response.data;
            });
    }

    ResendActivation(email) {
        return axios
            .post(api_url + "reactive-account", {
                email,

            })
            .then(Response => {

                return Response.data;
            });
    }

    forgotPassword = (email) => {
        return axios
            .post(api_url + "forgot-password", {
                email,

            }).then(response => {
                console.log(response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            })
    }
    verifyCode = (codeConfirmationDto) => {
        return axios.get(api_url2 + "confirm-reset", {
            params: {
                codeConfirmationDto: codeConfirmationDto
            }
        }).then(response => {

            return response;
        })
    }


    resetPassword = (email, password) => {
        return axios
            .post(api_url2 + "reset-password", {
                email, password

            }).then(response => {
                return response.data;
            })
    }

    logout = () => {
        localStorage.removeItem("user");
    }


    register(firstName, lastName, email, password, role) {
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

