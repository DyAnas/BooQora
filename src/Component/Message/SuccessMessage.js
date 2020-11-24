import {toast} from "react-toastify";

const SuccessMessage = (error)=> {
    toast.success(error, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}
export default SuccessMessage;