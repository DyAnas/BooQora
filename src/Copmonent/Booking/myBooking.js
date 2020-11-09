import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getAllBookingOfEmployeeInAPeriod, DeleteBookings} from "../../service/bookingService";
import AuthService from '../../Authentication/authUser';
import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeletIcon from '@material-ui/icons/Delete';
import TablePagination from '@material-ui/core/TablePagination';

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
        maxWidth:700,
    },
});




export default function MyBookings() {
    const classes = useStyles();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const today = new Date();
    const [from, setFrom]=useState(today);
    const [to, setTo]=useState(maxDate);
    const email = AuthService.getCurrentUser().email;
    const [ListBooking, setListBooking]= useState([]);
    const [message , setMessage]=useState("");
    // todo add floor to list
    const getAllBooking =()=> {
         getAllBookingOfEmployeeInAPeriod(email, from, to).then(
             response =>{
               setListBooking(response.data.bookingToshowDtoLists);
         })
    }
    const removeBooking =(item)=> {
        console.log(item)
        DeleteBookings(item).then(
            response=>{
                console.log(response.data.message)
                setTimeout(() => {
                    setMessage("")
                }, 3000);
                setMessage(response.data.message)
            }
        )
    }
    useEffect(() => {

        getAllBooking();


    }, [ListBooking, ]);
    // todo create dialog to confirm deleting

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // to show delete icon in cell
    const deleteIcon =index=>
        (<IconButton onClick={()=>removeBooking(index)}>
                <DeletIcon color="secondary" />
            </IconButton>
        );
    return (
        <div className="">
            <div className="center col-md-6">
                <p style={{ color: "red"}}>{message}</p>

            </div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead className= "btn-group-sm">
                    <TableRow >
                        <StyledTableCell align="left">Booking ID</StyledTableCell>
                        <StyledTableCell align="left">Date&nbsp;</StyledTableCell>
                        <StyledTableCell align="left">Floor&nbsp;</StyledTableCell>
                        <StyledTableCell align="left">Zone&nbsp;</StyledTableCell>
                        <StyledTableCell align="left">Edit&nbsp;</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody  className="table-body">
                   {ListBooking.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell align="left">{item.bookingId}</StyledTableCell>
                            <StyledTableCell align="left">{item.date}</StyledTableCell>
                            <StyledTableCell align="left">{item.floor}</StyledTableCell>
                            <StyledTableCell align="left">{item.zoneName}</StyledTableCell>
                            <StyledTableCell align="left"

                            >{deleteIcon(item.bookingId)}</StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
                <TablePagination
                    rowsPerPageOptions={[5,10]}
                    component="div"
                    count={ListBooking.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
        </TableContainer>



        </div>
    );
}

