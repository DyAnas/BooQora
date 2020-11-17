import React, {useEffect, useState} from 'react';
import {DeleteBookings, getAllBookingOfEmployeeInAPeriodEmployee} from "../../service/BookingService/bookingService";
import AuthService from '../../service/Authentication/authUser';
import MaterialTable from "material-table";

export default function MyBookings() {

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const today = new Date();
    const email = AuthService.getCurrentUser().email;
    const [ListBooking, setListBooking] = useState([]);
    const [message, setMessage] = useState("");
    // todo add floor to list
    const getAllBooking = () => {
        getAllBookingOfEmployeeInAPeriodEmployee(email, today, maxDate).then(
            response => {
                
                setListBooking(response.data.bookingToshowDtoLists);
                
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
            }
        )
    }
    useEffect(() => {
        getAllBooking();

    }, []);
    // todo create dialog to confirm deleting
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