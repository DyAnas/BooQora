import axios from "axios";


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
                // todo if not work  when i try to login, localstorage return null
                // todo maybe Response.data.accessToken return false
                // todo now without if it's work
               // if (Response.data.accessToken) {


                    localStorage.setItem("user", JSON.stringify(Response.data));

                //}
                console.log(JSON.parse(localStorage.getItem('user')));
                return Response.data;
            });
    }
    forgotPassword = (email) => {
        return axios
            .post(api_url + "forgot-password", {
                email,

            }).then(response => {
                localStorage.setItem("user", JSON.stringify(response.data));
                return  response.data;
            })
    }
    verifyCode = (confirmationCode)=> {
     console.log("confirm code", confirmationCode);
        return axios.get(api_url2 + "confirm-reset", {
                params:{
                    confirmationCode: {confirmationCode}
                }
            }).then(response => {
                console.log("response confirm", response)

                return  response;
            })
    }


    resetPassword = (email, password) => {
        return axios
            .post(api_url2 + "reset-password", {
                email, password

            }).then(response => {
                return  response.data;
            })
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

