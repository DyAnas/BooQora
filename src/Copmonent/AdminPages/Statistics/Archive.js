import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {getAllBookingOfEmployeeInAPeriod} from "../../../service/AdminStatistics";
import DatePicker from "react-datepicker";

export default function BookingsArchives() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [ListBooking, setListBooking]= useState([]);


    useEffect(() => {
        getAllBookingOfEmployeeInAPeriod(startDate, endDate).then(
            response =>{
                setListBooking(response.data.bookingofEmployeeDTOList);

            })


    }, [startDate, endDate]);

const [columns , setColumns]= useState(
    [
        { title: "Booking Id", field: "bookingId" },
        { title: "Date", field: "date",},
        { title: "Floor", field: "floor" },
        { title: "Zone", field: "zoneName",},
        { title: "Email", field: "email",},
    ]
)
    const [selectedRow, setSelectedRow] = useState(null);

        return (
            <div>
                <div className="container">
                    <h2 className="title">All Booking</h2>
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
                   <MaterialTable
                title="List booking by period"
                columns={columns}
                data={ListBooking}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                options={{
                    headerStyle: {
                        backgroundColor: '#e553a4',
                        color: '#FFF'
                    },
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                    })
                }}
                   />



            </div>
        );
}




