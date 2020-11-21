import React, {useEffect, useState} from 'react';
import {DeleteBookings, getAllBookingOfEmployeeInAPeriodEmployee} from "../../service/BookingService/bookingService";
import AuthService from '../../service/Authentication/authUser';
import MaterialTable from "material-table";
import { useHistory } from 'react-router-dom';
export default function MyBookings(props) {
    const history = useHistory();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const today = new Date();
    const email = AuthService.getCurrentUser().email;
    const [ListBooking, setListBooking] = useState([]);
    const [message, setMessage] = useState("");

    const getAllBooking = () => {
        getAllBookingOfEmployeeInAPeriodEmployee(email, today, maxDate).then(
            response => {
                setListBooking(response.data.bookingToShowDtoLists);
            },  (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if(error.response.status===401){
                    localStorage.clear()
                    history.push("/");
                    window.location.reload();
                    alert("You have been inactive for a while. For your security, please sign in again");
                }
                setMessage(resMessage)
            })
    }
    const removeBooking = (item) => {
        console.log("item  to remov",item);
        DeleteBookings(item.bookingId).then(
            response => {
                setTimeout(() => {
                    setMessage("")
                }, 3000);
                setMessage(response.data.message)
                getAllBooking();
            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if(error.response.status===401){
                    localStorage.clear()
                    history.push("/");
                    window.location.reload();
                    alert("You have been inactive for a while. For your security, please sign in again");
                }
                setMessage(resMessage)

            })
    }

    useEffect(() => {
        getAllBooking();
    }, []);

    // remove one booking
    const columns =
        [
            { title: "Booking Id", field: "bookingId" },
            { title: "Date", field: "date",},
            { title: "Floor", field: "floor" },
            { title: "Zone", field: "zoneName",},
        ]

    return (
        <div>
            <div className="center col-md-6">
                <p style={{ color: "red" }}>{message}</p>
            </div>
         <h2 className="title"> My Booking </h2>
            <MaterialTable
                title="Your booking "
                columns={columns}
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