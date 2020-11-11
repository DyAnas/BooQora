import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getAllBookingOfEmployeeInAPeriod} from "../../../service/AdminStatistics";
//import AuthService from '../../Authentication/authUser';
import TablePagination from '@material-ui/core/TablePagination';
import DatePicker  from "react-datepicker";
import 'bootstrap-daterangepicker/daterangepicker.css';


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




export default function WeeklyStatistics() {
    const classes = useStyles();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

   // const email = AuthService.getCurrentUser().email;
    const [ListBooking, setListBooking]= useState([]);
    //const [message , setMessage]=useState("");
    let message="";

    // todo add floor to list
    
    useEffect(() => {
        getAllBookingOfEmployeeInAPeriod(startDate, endDate).then(
            response =>{
                setListBooking(response.data.bookingofEmployeeDTOList);
            })
    }, [startDate, endDate]);


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


    return (
        <div className="">
            <div className="center col-md-6">
                <p style={{ color: "red"}}>{message}</p>

            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 labelsDate">
                        <h2 style={{fontSize: "20px"}} className="mr-3 labelsDate m-0">From </h2>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    startDate={startDate}
                    clearAriaLabel="From"
                    className="btn btn-info Calendar1 float-left"
                />
                    </div>
                        <div className="col-md-6">
                            <h2 style={{fontSize: "20px"}} className="mr-3 labelsDate m-0">To </h2>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    startDate={startDate}

                    className="btn btn-info Calendar1 float-left"
                />

                    </div>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead className= "btn-group-sm">
                        <TableRow >
                            <StyledTableCell align="left">Booking ID</StyledTableCell>
                            <StyledTableCell align="left">Date&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">Floor&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">Zone&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">Email&nbsp;</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody  className="table-body">
                        {ListBooking.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="left">{item.bookingId}</StyledTableCell>
                                <StyledTableCell align="left">{item.date}</StyledTableCell>
                                <StyledTableCell align="left">{item.floor}</StyledTableCell>
                                <StyledTableCell align="left">{item.zoneName}</StyledTableCell>
                                <StyledTableCell align="left">{item.email}</StyledTableCell>


                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5,10, 25, 50]}
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

