import React,  {useEffect, useState} from "react";
import ImageMapper from "react-image-mapper";
import URL from '../../assets/map.jpg'
import BookDialog from "./ConfirmBooking";
import "../../Styles/mapStyle.css";
import {BookPlass, CheckStatusOfAllZones, getZoneList} from "../../service/BookingService/mapService";
import AuthService from '../../service/Authentication/authUser';
import { withRouter} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Doughnut} from 'react-chartjs-2';
import en from "date-fns/locale/en-GB";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MapComponent = (props) => {
    const history = useHistory();
    const areas = [
        {
            id: 1,
            status: 0,
            style: "span1",
            zone: "Zone A",
            shape: "poly",
            coords: [235, 137, 235, 152, 216, 152, 212, 181, 221, 183, 217, 213, 284, 224, 295, 147],
            preFillColor: "#02f3af",
            fillColor: "#7fb775"
        },
        {
            id: 2,
            status: 0,
            style: "span2",
            zone: "Zone B",
            shape: "poly",
            coords: [86, 157, 88, 174, 82, 176, 84, 199, 98, 196, 102, 214, 190, 201, 180, 139],
            preFillColor:"#02f3af",
            fillColor: "#7fb775"
        },
        {
            id: 3,
            status: 0,
            style: "span3",
            zone: "Zone C",
            shape: "poly",
            coords: [11, 174, 42, 171, 63, 153, 59, 261, 6, 267],
            preFillColor: "#02f3af",
            fillColor: "#7fb775"
        },
        {
            id: 4,
            status: 0,
            zone: "Zone D",
            style: "span4",
            shape: "poly",
            coords: [11, 8, 63, 3, 66, 50, 63, 104, 15, 104],
            preFillColor:"#02f3af",
            fillColor: "#7fb775"
        },

        {
            id: 5,
            status: 0,
            zone: "Zone E",
            style: "span5",
            shape: "poly",
            coords: [67, 41, 64, 102, 154, 100, 156, 38],
            preFillColor: "#02f3af",
            fillColor: "#7fb775"
        },
        {
            id: 6,
            status: 0,
            zone: "Zone F",
            style: "span6",
            shape: "poly",
            coords: [157, 39, 154, 100, 250, 98, 250, 91, 264, 91, 291, 35],
            preFillColor: "#02f3af",
            fillColor: "#7fb775"
        },
        {
            id: 7,
            status: 0,
            zone: "Zone G",
            style: "span7",
            shape: "poly",
            coords: [15, 105, 63, 104, 63, 151, 41, 170, 11, 172],
            preFillColor: "#02f3af",
            fillColor: "#7fb775"
        },

    ];
    const [query, setQuery] = useState(2);
    // handle calender
    // today and maxDate to show in calendar
    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const date = startDate.getDate()  + '-' + (startDate.getMonth() + 1)  + '-' + startDate.getFullYear();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

    //  handle dialog
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);
    // handle zone
    const [ZoneID, setZoneID] = useState();
    const [Zone, setZone] = useState();
    const [mapAreas, setMapAreas] = useState({
        name: "choose a floor",
        areas: [areas[0], areas[5]]
    });
    // method to get all active zones
    const getActiveZone = (floor) => {
        let items = [];
        let areasToShow;
        getZoneList(floor).then(
            response => {
                    response.data.zoneDTOList.map((i, index) => {
                        areas[index].id = i.id
                        if (i.activated === true) {
                            return items.push(index);

                        }
                        return null;
                    })
                    areasToShow = items.map(item => {
                        return areas[item]
                    })
                    setMapAreas({
                        name: floor.toString(),
                        areas: areasToShow
                    })
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if(error.response.status===401){
                    localStorage.clear()
                    history.push("/");


                 } else {
                toast.error(resMessage, {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                }
            } )

    }
    // method to get all statistics of zones
    const getStatusOfAllZones = (floorId, date) => {
        let items = [];
        CheckStatusOfAllZones(floorId, date).then(
            response => {
                response.data.map((i, index) => {

                    // to change color of zone depend to percentage of booking
                    areas[index].status = i.bookedPercentage;
                    if (i.bookedPercentage < 40) {
                        areas[index].preFillColor = 'rgb(158,233,162)'
                    } else if (i.bookedPercentage > 40 || i.bookedPercentage < 70) {
                        areas[index].preFillColor = 'rgba(255, 206, 86, 0.6)';
                    } else {
                        areas[index].preFillColor = 'rgba(255, 99, 132, 0.6)';
                    }
                     return items.push(i.bookedPercentage);
                })

                setBarData({
                    labels: ["Zone A", "Zon B", "Zone C", "Zone D", "Zone E", "Zone F", "Zone G"],
                    datasets: [
                        {
                            label: "Status Floor" + floorId + "By Zone",
                            data: items,
                            backgroundColor: [
                                'rgba(255,99,132,0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgb(75,192,169)',
                                'rgb(161,75,192)',
                                'rgb(158,224,209)'
                            ],
                            borderWidth: 3
                        }
                    ]
                })

            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if(error.response.status===401){
                    localStorage.clear()
                    props.history.push("/");

                    toast.error("You have been inactive for a while. For your security, please sign in again", {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                }else {
                toast.error(resMessage, {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                }
            } )

    }

    const [barData, setBarData] = useState({});
    const [floor, setFloor] = useState(1)

    // floor handle
    const handleClickFloor = (floor) => {

        getStatusOfAllZones(floor, startDate)
        getActiveZone(floor);
        setFloor(floor);

    }
    // to update map areas when floor is clicked and date is changed
    useEffect(() => {
        setQuery(Math.random());

    }, [mapAreas, startDate, ]);


    useEffect(() => {

    }, [floor, startDate, areas]);


    // handle onclick zone
    const enterArea = (area) => {
        setZoneID(area.id);
        setZone(area.zone)
        handleShow();

    }

    const showDialog = () => {
        setTimeout(() => {
            setShow(false)
            props.history.push("/myBookings");
        }, 3000);
        setLoading(true);
        setShow(true);
    }

    // confirm booking
    const currentUser = AuthService.getCurrentUser();
    const confirmBooking = () => {
        BookPlass(startDate, currentUser.id, ZoneID).then(
            response => {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                    showDialog();

            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error.response.status === 401) {
                    localStorage.clear()
                    props.history.push("/");
                   // window.location.reload();
                    toast.error("You have been inactive for a while. For your security, please sign in again", {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                }else if (error.response.status === 400) {

                    toast.error("You already have booking on that day", {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    setShow(false);

                }
                toast.error(resMessage, {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
    }

    return (
        <div className="container container-sm">
            <div className=" mt-4 mb-4 center ">
                <div className="">
                    <h2 className="title">New booking</h2>

                    <p className="justify-text">Choose a date and click on a floor to show zone.</p>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={8000}/>
            <div className="row mr-0 ml-0">
                <div className="col-md-6 pl-5 m-auto">

                    <div className="mb-3">
                        <DatePicker
                            id="dates"
                            dateFormat="dd-MM-yyyy"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            startDate={startDate}
                            minDate={today}
                            maxDate={maxDate}
                            className="btn btn-info btn-sm Calendar1 float-left "
                            locale={en}
                            showWeekNumbers
                        />
                        <BookDialog
                            show={show}
                            onHide={handleClose}
                            name={floor}
                            Zone={Zone}
                            ConfirmBooking={confirmBooking}
                            dates={date}
                            loading={loading}

                        />
                    </div>

                    <div className="col d-sm-inline-block  ">
                        <div className="images">
                            <ImageMapper
                                src={`${URL}?${query}`}
                                map={mapAreas}
                                width={300}
                                onClick={enterArea}
                            />

                            {mapAreas.areas.map((x, i) =>

                                    <span className={mapAreas.areas[i].style} key={i}> {mapAreas.areas[i].zone}
                                        <br/>
                                        {mapAreas.areas[i].status}%
                                     </span>
                            )}
                        </div>
                    </div>
                    <div className="col d-sm-inline-block mt-4">
                        <div className="btn-group">
                            {[...Array(7)].map((x, i) =>
                                <button className="btn btn-light mt-1 ml-1 mr-1 " key={i}
                                        onClick={() => handleClickFloor(i + 1)}>{i + 1}</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-sm-5 d-none d-md-block m-auto">
                    <Doughnut
                        data={barData}
                        width={60}
                        height={50}
                        id="doughnut"
                    />
                </div>
            </div>
        </div>

    );
}
export default withRouter(MapComponent);

