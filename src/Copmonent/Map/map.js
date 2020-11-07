import React, { useState, useEffect } from "react";
import ImageMapper from "react-image-mapper";
import URL from '../../assets/map.jpg'
import Example from "./DialogAlert";
import "../../Styles/mapStyle.css";
import {getZoneList, CheckStatusOfAllZones, BookPlass} from "../../service/mapService";
import AuthService from '../../Authentication/authUser';
import { Form } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MapComponent=(props)=> {
const [Color, setColor]=useState("")
    const areas = [
        {
            id:1,
            zone:"Zone A",
            shape: "poly",
            coords: [235, 137, 235, 152, 216, 152, 212, 181, 221, 183, 217, 213, 284, 224, 295, 147],
            preFillColor:  "",
            fillColor: "#7fb775"
        },
        {
            id:2,
            zone:"Zone B",
            shape: "poly",
            coords: [86, 157, 88, 174, 82, 176, 84, 199, 98, 196, 102, 214, 190, 201, 180, 139],
            preFillColor: "",
            fillColor: "#7fb775"
        },
        {
            id: 3,
            zone:"Zone C",
            shape: "poly",
            coords: [11, 174, 42, 171, 63, 153, 59, 261, 6, 267],
            preFillColor: "",
            fillColor: "#7fb775"
        },
        {
            id: 4,
            zone:"Zone D",
            shape: "poly",
            coords: [11, 8, 63, 3, 66, 50, 63, 104, 15, 104],
            preFillColor: "",
            fillColor: "#7fb775"
        },

        {
            id: 5,
            zone:"Zone E",
            shape: "poly",
            coords: [67, 41, 64, 102, 154, 100, 156, 38],
            preFillColor: "",
            fillColor: "#7fb775"
        },
        {
            id:6,
            zone:"Zone F",
            shape: "poly",
            coords: [157, 39, 154, 100, 250, 98, 250, 91, 264, 91, 291, 35],
            preFillColor: "#02f3af",
            fillColor: "#7fb775"
        },
        {
            id: 7,
            zone:"Zone G",
            shape: "poly",
            coords: [15, 105, 63, 104, 63, 151, 41, 170, 11, 172],
            preFillColor: "",
            fillColor: "#7fb775"
        },

    ];

    const [query, setQuery] = useState(1);
    //  handle dialog
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ZoneID, setZoneID] = useState();
    const [Zone, setZone] = useState();
    const [mapAreas, setMapAreas] = useState({
        name: "choose a floor",
        areas: [
        ]
    });
    const [listZone, setListZone] = useState([]);
// method to get all active zones
    const GetActiveZone=(floor)=> {
       let items=[];
       let areasToShow;
        getZoneList(floor).then(
            response=> {
                response.data.zoneDTOList.map((i, index)=> {
                    if( i.activated===true){
                        items.push(index);
                        return areas[index]
                    }
                })
                areasToShow= items.map(item=> {
                    return areas[item]
                })
                setMapAreas({
                    name: floor.toString(),
                    areas: areasToShow
                })
               // return setListZone(items)
            })
    }
    // method to get all statistics of zones
    const GetStatusOfAllZones=(floorId,date)=> {
        let items=[];
        CheckStatusOfAllZones(floorId,date ).then(
            response=> {
                response.data.map((i, index)=> {
                        items.push(i.bookedPercentage);
                      // to change color of zone depend to percentage of booking
                        if (i.bookedPercentage < 40){
                        areas[index].preFillColor="#02f3af"
                        }else if(i.bookedPercentage > 40 || i.bookedPercentage < 70){
                            areas[index].preFillColor="#e7df8e"
                        }
                        else {
                            areas[index].preFillColor="#7fb775"
                        }

                })
                return setStatus(items)


            })
    }

    const [status , setStatus]= useState([]);
    // arrays for name of zone, style, and statistics
    const [statistic, setStatistic] = useState({
        Style: ["span1  position-absolute", "span2  position-absolute", "span3  position-absolute",
            "span4  position-absolute", "span5  position-absolute", "span6  position-absolute", "span7  position-absolute"],

    });


    // to update map areas when floor is clicked
    useEffect(() => {
           setQuery(Math.random());

    }, [mapAreas]);
    const [floor , setFloor]=useState(1)
    // todo create a method to check if employee have a booking on today
    useEffect(() => {
        // todo method send date and employee id and get response boolean if he have a booking


    }, []);
    // handle onclick sone
    const enterArea = (area) => {
        console.log(area);
        setZoneID(area.id);
        setZone(area.zone)
        setMessage("");
        handleShow();
    }

   // todo fix double click to show zone
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

    const [message , setMessage]=useState("");
    const currentUser = AuthService.getCurrentUser();
    const  ConfirmBooking= ()=>{
            BookPlass(startDate, currentUser.id, ZoneID).then(
                response=> {
                    if (response.data.message=== "You already have booking on that day"){
                        setShow(false);
                        setMessage("You already have booking on that day");
                    }else {
                        setMessage(response.data.message);
                        ShowDialog();
                    }
                })
    }
    // handle calender
    // today and maxDate to show in calendar
    const today = new Date();
    const maxDate=new Date (new Date(today.getFullYear(), today.getMonth(), today.getDay()+7,today.getHours(),today.getMinutes(),today.getSeconds()));

    const [startDate, setStartDate] = useState(today);
    const date=startDate.getFullYear() +'-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();;
    return (
        <div className="container ">
            <div className=" ">
            <h2 className=" ml-3 mb-2 mt-2  title">New booking</h2>
                <br/>
            <p className=" ml-3">Choose a date and Double click on a floor to show zone.</p>
            </div>
            <div className="center col-md-6">
                <p style={{ color: "red"}}>{message}</p>

            </div>

            <div className="col-md-6 ">

                <div className="mb-3">
                    {/* todo datapicker show under image when man choose a floor*/}
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        startDate={startDate}
                        minDate={today}
                        maxDate={maxDate}
                      className="btn btn-info Calendar1 float-left"
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
                            {statistic.Style.map((x, i) =>

                                <span className={statistic.Style[i]} key={i}> {areas[i].zone}
                                    <br />
                                    {status[i]}%

                         </span>
                            )}
                        </div>

                </div>
                <div className="col-6 d-sm-inline-block mt-4">
                    <div className="btn-group">
                        {[...Array(7)].map((x, i) =>
                            <button className="btn btn-light mt-1 ml-1 mr-1 " key={i}
                                onClick={() => handleClickFloor(i + 1)} >{i + 1}</button>
                        )}
                    </div>
                </div>

            </div>

        </div>

    );
}
export default withRouter(MapComponent);

