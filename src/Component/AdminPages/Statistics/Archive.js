import React, {useCallback, useEffect, useState} from "react";
import MaterialTable from "material-table";
import {getAllBookingOfEmployeeInAPeriod} from "../../../service/AdminService/AdminStatistics";
import DatePicker from "react-datepicker";
import en from "date-fns/locale/en-GB";
import {useHistory} from "react-router-dom";
export default function BookingsArchives() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [ListBooking, setListBooking]= useState([]);
    const history = useHistory();
    const getAllBooking= (response,error)=> {
        if (response){
        setListBooking(response.data.bookingofEmployeeDTOList);
        }
      /*  console.log(response.error)

        console.log(error)
           if(response){

                localStorage.clear()
                history.push("/");
                window.location.reload();
                alert("You have been inactive for a while. For your security, please sign in again");
            }
*/
    }

    const fetchBooking= useCallback(() => {
        getAllBookingOfEmployeeInAPeriod(startDate, endDate).then(getAllBooking, error=> {
            if( error.status===401) {

                localStorage.clear()
                history.push("/");
                window.location.reload();
                alert("You have been inactive for a while. For your security, please sign in again");
            }
        })
    }, [startDate, endDate])
    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])


const columns =
    [
        { title: "Booking Id", field: "bookingId" },
        { title: "Date", field: "date",},
        { title: "Floor", field: "floor" },
        { title: "Zone", field: "zoneName",},
        { title: "Email", field: "email",},
    ]

    const [selectedRow, setSelectedRow] = useState(null);



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
                  <div className="table col-12 mt-4">

                   <MaterialTable
                title="List booking by period"
                columns={columns}
                data={ListBooking}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                  options={{
                    filtering: true,
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




