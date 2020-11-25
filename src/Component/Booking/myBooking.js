import React, {useEffect, useState} from 'react';
import {DeleteBookings, getAllBookingOfEmployeeInAPeriodEmployee} from "../../service/BookingService/bookingService";
import AuthService from '../../service/Authentication/authUser';
import MaterialTable from "material-table";
import {useHistory} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import successMessage from "../Message/SuccessMessage";
import errorMessage from "../Message/ErrorMessage";

export default function MyBookings(props) {
    const history = useHistory();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const today = new Date();
    const email = AuthService.getCurrentUser().email;
    const [ListBooking, setListBooking] = useState([]);


    const getAllBooking = () => {
        getAllBookingOfEmployeeInAPeriodEmployee(email, today, maxDate).then(
            response => {
                setListBooking(response.data.bookingToShowDtoLists);
            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error.response.status === 401) {
                    localStorage.clear()
                    history.push("/");
                    // window.location.reload();
                    errorMessage("You have been inactive for a while. For your security, please sign in again")


                } else {
                    errorMessage(resMessage)

                }
            })
    }
    const removeBooking = (item) => {
        console.log("item  to remov", item);
        DeleteBookings(item.bookingId).then(
            response => {
                successMessage(response.data.message)

                getAllBooking();
            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error.response.status === 401) {
                    localStorage.clear()
                    history.push("/");
                    // window.location.reload();
                    errorMessage("You have been inactive for a while. For your security, please sign in again")

                } else {
                    errorMessage(resMessage)

                }
            })
    }

    useEffect(() => {
        getAllBooking();
    }, []);

    // remove one booking
    const columns =
        [
            {title: "Booking Id", field: "bookingId"},
            {title: "Date", field: "date",},
            {title: "Floor", field: "floor"},
            {title: "Zone", field: "zoneName",},
        ]

    return (
        <div>
            <ToastContainer
                position="top-center"/>
            <div className=" mt-4 mb-4 center ">

                <h3 className="title">My booking</h3>

            </div>
            <MaterialTable
                title="Your booking "
                columns={columns}
                id="tableBooking"
                data={ListBooking}
                options={{
                    headerStyle: {
                        backgroundColor: '#e553a4',
                        color: '#FFF'
                    },

                }}
                actions={[
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Delete Booking',
                        onClick: (event, rowData) => removeBooking(rowData),

                    })
                ]}
            />
        </div>
    );
}




//TODO Unit testing with stub for mocking api (ANAS)

//TODO Colors adjustment (New Booking) (Abod)

//TODO Reponsive Design for small screens (Abod)
//TODO Expired Token and its toasts in statitics (ANAS)





