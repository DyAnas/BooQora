import React, {useEffect, useState} from 'react';
import {DeleteBookings, getAllBookingOfEmployeeInAPeriodEmployee} from "../../service/BookingService/bookingService";
import AuthService from '../../service/Authentication/authUser';
import MaterialTable from "material-table";
import {useHistory} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessMessage from "../Message/SuccessMessage";
import ErrorMessage from "../Message/ErrorMessage";

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
                    ErrorMessage("You have been inactive for a while. For your security, please sign in again")


                } else {
                    ErrorMessage(resMessage)

                }
            })
    }
    const removeBooking = (item) => {
        console.log("item  to remov", item);
        DeleteBookings(item.bookingId).then(
            response => {
                SuccessMessage(response.data.message)

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
                    ErrorMessage("You have been inactive for a while. For your security, please sign in again")

                } else {
                    ErrorMessage(resMessage)

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
        
            <MaterialTable
                title="Your booking "
                columns={columns}
                id="tableBooking"
                data={ListBooking}
                options={{
                    headerStyle: {
                        backgroundColor: '#008891',
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





//TODO Colors adjustment (New Booking) (Abod)

//TODO Reponsive Design for small screens (Abod)

//TODO Page Not Found








// return (
//     <div className="container container-sm pl-0 pb-4 pr-0 pt-3" >
//         <h2 className="title text-center">New booking</h2>
//         <div className=" row  mr-0 justify-content-center">

//             <div className="d-flex flex-row flex-column-sm mt-2">

//                 <p className="justify-text" id="dpLable">Date:  </p>
//                 <DatePicker
//                     id="dates"
//                     dateFormat="dd-MM-yyyy"
//                     selected={startDate}
//                     onChange={date => setStartDate(date)}
//                     startDate={startDate}
//                     minDate={today}
//                     maxDate={maxDate}
//                     className=" datapicker btn-sm Calendar1 float-left "
//                     locale={en}
//                     showWeekNumbers
//                     customInput={<DatePickerCustomInput />}
//                 />

//             </div>
//         </div>

//         <div className="row mr-0 ml-0">
//             <div className="col-md-4  m-auto p-0">
//                 <div className="col d-sm-inline-block mb-4 pl-0">
//                     <div className="btn-group">
//                         {[...Array(7)].map((x, i) =>
//                             <button className={styleId(i)} id={"btn" + i} key={i}
//                                 onClick={() => handleClickFloor(i + 1)}>{i + 1}</button>
//                         )}
//                     </div>
//                 </div>


//                 <div className="col d-sm-inline-block  pl-0">
//                     <div className="images">
//                         <ImageMapper
//                             src={`${URL}?${query}`}
//                             map={mapAreas}
//                             width={300}
//                             onClick={enterArea}
//                         />

//                         {mapAreas.areas.map((x, i) =>

//                             <span className={mapAreas.areas[i].style} key={i}> {mapAreas.areas[i].zone}
//                                 <br />
//                                 {mapAreas.areas[i].status}%
//                              </span>
//                         )}
//                     </div>
//                 </div>
//                 <div className="mt-3 ">

//                     <p className="justify-text text-center pr-lg-5" style={{ fontWeight: "bold", color: "#385844" }}
//                         id="mapParagraph">Floor {floor} availability overview</p>
//                     <BookDialog
//                         show={show}
//                         onHide={handleClose}
//                         name={floor}
//                         Zone={Zone}
//                         ConfirmBooking={confirmBooking}
//                         dates={date}
//                         loading={loading}

//                     />
//                 </div>
//             </div>
//             <div className="col-2  ">

//                 {/*TODO*/}sssssssss
//         </div>
//             <div className="col-md-5 d-none d-md-block m-auto text-center">

//                 <Doughnut
//                     data={barData}
//                     width={60}
//                     height={50}
//                     id="doughnut"
//                 />
//                 <p className="justify-text text-center mt-3" style={{ fontWeight: "bold", color: "#385844" }}
//                     id="mapParagraph">Bookings overview per zone in Floor</p>

//             </div>
//         </div>
//         <ToastContainer
//             position="top-center"
//             autoClose={8000} />
//     </div>

// );
// }
// export default withRouter(MapComponent);









// return (
//     <div className="container container-sm pl-0 pb-4 pr-0 pt-3" >
//         <div className=" row  mr-0 justify-content-center">
//             <div className="d-flex flex-column ">
//                 <h2 className="title ">New booking</h2>

//                 <DatePicker
//                         id="dates"
//                         dateFormat="dd-MM-yyyy"
//                         selected={startDate}
//                         onChange={date => setStartDate(date)}
//                         startDate={startDate}
//                         minDate={today}
//                         maxDate={maxDate}
//                         className="btn datapicker btn-sm Calendar1 float-left "
//                         locale={en}
//                         showWeekNumbers
//                     />
               
//             </div>
//         </div>
//         <ToastContainer
//             position="top-center"
//             autoClose={8000}/>
//         <div className="row mr-0 ml-0">
//             <div className="col-md-6  m-auto p-0">

//                 <div className="mb-3 ">
//                 <p className="justify-text" id="mapParagraph">Choose date and floor to see zone state.</p>
//                     <BookDialog
//                         show={show}
//                         onHide={handleClose}
//                         name={floor}
//                         Zone={Zone}
//                         ConfirmBooking={confirmBooking}
//                         dates={date}
//                         loading={loading}

//                     />
//                 </div>

//                 <div className="col d-sm-inline-block  pl-0">
//                     <div className="images">
//                         <ImageMapper
//                             src={`${URL}?${query}`}
//                             map={mapAreas}
//                             width={300}
//                             onClick={enterArea}
//                         />

//                         {mapAreas.areas.map((x, i) =>

//                                 <span className={mapAreas.areas[i].style} key={i}> {mapAreas.areas[i].zone}
//                                     <br/>
//                                     {mapAreas.areas[i].status}%
//                                  </span>
//                         )}
//                     </div>
//                 </div>
//                 <div className="col d-sm-inline-block mt-4 pl-0">
//                     <div className="btn-group">
//                         {[...Array(7)].map((x, i) =>
//                             <button className={styleId(i)} id={"btn"+i} key={i}
//                                     onClick={() => handleClickFloor(i + 1)}>{i + 1}</button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <div className="col-md-5 d-none d-md-block m-auto">
//                 <Doughnut
//                     data={barData}
//                     width={60}
//                     height={50}
//                     id="doughnut"
//                 />
//             </div>
//         </div>
//     </div>

// );
// }
// export default withRouter(MapComponent);

