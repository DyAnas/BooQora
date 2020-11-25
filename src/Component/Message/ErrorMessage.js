import {toast} from "react-toastify";

const errorMessage = (error)=> {
   
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
export default errorMessage;