import { toast } from "react-toastify";

const warningMessage = (error) => {
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
export default warningMessage;