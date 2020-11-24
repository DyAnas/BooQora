import {toast} from "react-toastify";

const ErrorMessage = (error)=> {
    console.log(error)
    toast.error(error, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}
export default ErrorMessage;