import React, { useCallback, useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
import { getAllBookingOfEmployeeInAPeriod } from "../../../service/AdminService/AdminStatistics";
import DatePicker from "react-datepicker";
import en from "date-fns/locale/en-GB";
import DatePickerCustomInput from "../../../Module/DatePickerCustomInput";
import Filter from '@material-ui/icons/FindInPageOutlined';


const tableIcons = {

    Filter: forwardRef((props, ref) => <Filter style={{ color: "green" }} {...props} ref={ref} />),

};
export default function BookingsArchives() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [ListBooking, setListBooking] = useState([]);

    const getAllBooking = (response) => {
        setListBooking(response.data.bookingOfEmployeeDTOList);

    }

    const fetchBooking = useCallback(() => {
        getAllBookingOfEmployeeInAPeriod(startDate, endDate).then(getAllBooking)
    }, [startDate, endDate])
    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])

    const columns =
        [
            { title: "Booking Id", field: "bookingId" },
            { title: "Date", field: "date", },
            { title: "Floor", field: "floor" },
            { title: "Zone", field: "zoneName", },
            { title: "Email", field: "email", },
        ]

    const [selectedRow, setSelectedRow] = useState(null);

    return (
        <div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 ">
                        <h2 style={{ fontSize: "20px" }} className="mr-3  m-0">From </h2>
                        <DatePicker
                            id="from"
                            dateFormat="dd-MM-yyyy"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            startDate={startDate}
                            clearAriaLabel="From"
                            className="btn btn-info Calendar1 float-left"
                            locale={en}
                            showWeekNumbers
                            customInput={<DatePickerCustomInput />}
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 style={{ fontSize: "20px" }} className="mr-3  m-0">To </h2>
                        <DatePicker
                            id="to"
                            dateFormat="dd-MM-yyyy"
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            startDate={startDate}
                            locale={en}
                            showWeekNumbers
                            className="btn btn-info Calendar1 float-left"
                            customInput={<DatePickerCustomInput />}
                        />
                    </div>
                    <div className="table col-12 mt-4 pl-0 pr-0">

                        <MaterialTable
                            title="Booking Archive:"
                            icons={tableIcons}
                            columns={columns}
                            data={ListBooking}
                            onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                            options={{
                                filtering: true,

                                headerStyle: {
                                    backgroundColor: '#008891',
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




