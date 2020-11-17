import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {getAllBookingOfEmployeeInAPeriod} from "../../../service/AdminService/AdminStatistics";
import DatePicker from "react-datepicker";
import en from "date-fns/locale/en-GB";
export default function BookingsArchives() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [ListBooking, setListBooking]= useState([]);


    useEffect(() => {
      /*  getAllBookingOfEmployeeInAPeriod(startDate, endDate).then(
            response =>{
                setListBooking(response.data.bookingofEmployeeDTOList);

            })*/


    }, []);

const columns =
    [
        { title: "Booking Id", field: "bookingId" },
        { title: "Date", field: "date",},
        { title: "Floor", field: "floor" },
        { title: "Zone", field: "zoneName",},
        { title: "Email", field: "email",},
    ]

    const [selectedRow, setSelectedRow] = useState(null);
  const onSubmit =()=> {
    getAllBookingOfEmployeeInAPeriod(startDate, endDate).then(
        response =>{
            setListBooking(response.data.bookingofEmployeeDTOList);

        })

}
        return (
            <div>

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
                                locale={en}
                                showWeekNumbers
                            />
                        </div>
                        <div className="col-md-6">
                            <h2 style={{fontSize: "20px"}} className="mr-3 labelsDate m-0">To </h2>
                            <DatePicker
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                startDate={startDate}
                                locale={en}
                                showWeekNumbers
                                className="btn btn-info Calendar1 float-left"
                            />

                        </div>

                </div>
                    <div className="">
                        <button className="btn-info" onClick={onSubmit}>Show Booking</button>
                  <div className="table col-12 mt-4">

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
                </div>
                </div>
            </div>
        );
}




