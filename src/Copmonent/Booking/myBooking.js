import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getAllBookingOfEmployeeInAPeriodEmployee, DeleteBookings } from "../../service/bookingService";
import AuthService from '../../Authentication/authUser';
import IconButton from "@material-ui/core/IconButton";
import DeletIcon from '@material-ui/icons/Delete';
import MaterialTable from "material-table";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);





const useStyles = makeStyles({
    table: {
        minWidth: 350,
        maxWidth: 700,
    },
});




export default function MyBookings() {
    const classes = useStyles();
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
    const [columns , setColumns]= useState(
        [
            { title: "Booking Id", field: "bookingId" },
            { title: "Date", field: "date",},
            { title: "Floor", field: "floor" },
            { title: "Zone", field: "zoneName",},

        ]
    )


    // to show delete icon in cell
    const deleteIcon = index =>
        (<IconButton onClick={() => removeBooking(index)}>
            <DeletIcon color="secondary" />
        </IconButton>
        );
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