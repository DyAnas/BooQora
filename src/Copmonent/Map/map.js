import React, { useState, useEffect } from "react";
import ImageMapper from "react-image-mapper";
import URL from '../../assets/map.jpg'
import Example from "./DialogAlert";
import "../../Styles/mapStyle.css";
import { getZoneList, CheckStatusOfAllZones, BookPlass } from "../../service/mapService";
import AuthService from '../../Authentication/authUser';
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MapComponent = (props) => {
    const areas = [
        {
            id: 1,
            style: "span1",
            zone: "Zone A",
            shape: "poly",
            coords: [235, 137, 235, 152, 216, 152, 212, 181, 221, 183, 217, 213, 284, 224, 295, 147],
            preFillColor: "",
            fillColor: "#7fb775"
        },
        {
            id: 2,
            style: "span2",
            zone: "Zone B",
            shape: "poly",
            coords: [86, 157, 88, 174, 82, 176, 84, 199, 98, 196, 102, 214, 190, 201, 180, 139],
            preFillColor: "",
            fillColor: "#7fb775"
        },
        {
            id: 3,
            style: "span3",
            zone: "Zone C",
            shape: "poly",
            coords: [11, 174, 42, 171, 63, 153, 59, 261, 6, 267],
            preFillColor: "",
            fillColor: "#7fb775"
        },
        {
            id: 4,
            zone: "Zone D",
            style: "span4",
            shape: "poly",
            coords: [11, 8, 63, 3, 66, 50, 63, 104, 15, 104],
            preFillColor: "",
            fillColor: "#7fb775"
        },

        {
            id: 5,
            zone: "Zone E",
            style: "span5",
            shape: "poly",
            coords: [67, 41, 64, 102, 154, 100, 156, 38],
            preFillColor: "",
            fillColor: "#7fb775"
        },
        {
            id: 6,
            zone: "Zone F",
            style: "span6",
            shape: "poly",
            coords: [157, 39, 154, 100, 250, 98, 250, 91, 264, 91, 291, 35],
            preFillColor: "#02f3af",
            fillColor: "#7fb775"
        },
        {
            id: 7,
            zone: "Zone G",
            style: "span7",
            shape: "poly",
            coords: [15, 105, 63, 104, 63, 151, 41, 170, 11, 172],
            preFillColor: "",
            fillColor: "#7fb775"
        },

    ];
    const [query, setQuery] = useState(1);
    // handle calender
    // today and maxDate to show in calendar
    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const date = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

    //  handle dialog
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // handle zone
    const [ZoneID, setZoneID] = useState();
    const [Zone, setZone] = useState();
    const [mapAreas, setMapAreas] = useState({
        name: "choose a floor",
        areas: [
        ]
    });
    // method to get all active zones
    const GetActiveZone = (floor) => {
        let items = [];
        let areasToShow;
        getZoneList(floor).then(
            response => {
                response.data.zoneDTOList.map((i, index) => {
                    areas[index].id = i.id
                    if (i.activated === true) {
                        items.push(index);

                    }
                    
                })
                areasToShow = items.map(item => {
                    return areas[item]
                })
                setMapAreas({
                    name: floor.toString(),
                    areas: areasToShow
                })

            })
    }
    // method to get all statistics of zones
    const GetStatusOfAllZones = (floorId, date) => {
        let items = [];
        CheckStatusOfAllZones(floorId, date).then(
            response => {

                response.data.map((i, index) => {
                    items.push(i.bookedPercentage);
                    // to change color of zone depend to percentage of booking

                    if (i.bookedPercentage < 40) {
                        areas[index].preFillColor = 'rgb(158,233,162)'
                    } else if (i.bookedPercentage > 40 || i.bookedPercentage < 70) {
                        areas[index].preFillColor = 'rgba(255, 206, 86, 0.6)';
                    }
                    else {
                        areas[index].preFillColor = 'rgba(255, 99, 132, 0.6)';
                    }

                })
                return setStatus(items)


            })
    }

    const [status, setStatus] = useState([]);
    // arrays style of zone
    // const Style = ["span1  position-absolute", "span2  position-absolute", "span3  position-absolute",
    //     "span4  position-absolute", "span5  position-absolute", "span6  position-absolute", "span7  position-absolute"];


    // to update map areas when floor is clicked and date is changed
    useEffect(() => {
        setQuery(Math.random());
        GetStatusOfAllZones(floor, startDate)
    }, [mapAreas, startDate]);
    const [floor, setFloor] = useState(1)

    // handle onclick zone
    const enterArea = (area) => {
        setZoneID(area.id);
        setZone(area.zone)
        setMessage("");
        handleShow();

    }
    // floor handle
    const handleClickFloor = (floor) => {
        setMessage("")
        GetStatusOfAllZones(floor, startDate)
        GetActiveZone(floor);
        setFloor(floor)

    }
    const ShowDialog = () => {
        setTimeout(() => {
            setShow(false)
            props.history.push("/myBookings");
        }, 3000);
        setShow(true);
    }

    const [message, setMessage] = useState("");
    // confirm booking
    const currentUser = AuthService.getCurrentUser();
    const ConfirmBooking = () => {
        BookPlass(startDate, currentUser.id, ZoneID).then(
            response => {
                if (response.data.message === "You already have booking on that day") {
                    setShow(false);
                    setMessage("You already have booking on that day");
                } else {
                    setMessage(response.data.message);
                    ShowDialog();
                }
            })
    }


    return (
        <div className="container container-sm" >
            <div className="row d-flex text-center flex-column">
                <div className="col-sm">
                    <h3 className="">New booking</h3>

                    <p className="justify-text">Choose a date and click on a floor to show zone.</p>
                </div>
            </div>
            <div className="center col-md-6">
                <p style={{ color: "red" }}>{message}</p>

            </div>
            <div className="row ">
                <div className="col-md-6 pr-0">

                    <div className="mb-3 text-center">


                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            startDate={startDate}
                            minDate={today}
                            maxDate={maxDate}
                            className="btn btn-info Calendar1 float-left btn-sm"

                        />

                        <Example
                            show={show}
                            onHide={handleClose}
                            name={mapAreas.name}
                            Zone={Zone}
                            ConfirmBooking={ConfirmBooking}
                            messages={message}
                            dates={date}
                        />
                    </div>

                    <div className="col d-sm-inline-block  ">
                        <div className="images" >
                            <ImageMapper
                                src={`${URL}?${query}`}
                                map={mapAreas}
                                width={300}
                                onClick={enterArea}
                            />
                            {mapAreas.areas.map((x, i) =>

                                <span className={mapAreas.areas[i].style} key={i}> {mapAreas.areas[i].zone}
                                    <br />
                                    {status[i]}%

                         </span>
                            )}
                        </div>

                    </div>
                    <div className="col d-sm-inline-block mt-4">
                        <div className="btn-group">
                            {[...Array(7)].map((x, i) =>
                                <button className="btn btn-light mt-1 ml-1 mr-1 " key={i}
                                    onClick={() => handleClickFloor(i + 1)} >{i + 1}</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-sm d-none d-md-block" >
                    
                </div>


            </div>
        </div>

    );
}
export default withRouter(MapComponent);

