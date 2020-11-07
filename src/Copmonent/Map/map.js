import React, { useState, useEffect } from "react";
import ImageMapper from "react-image-mapper";
import URL from '../../assets/map.jpg'
import Example from "./DialogAlert";
import "../../Styles/mapStyle.css";
import {getZoneList, CheckStatusOfAllZones, BookPlass} from "../../service/mapService";
import AuthService from '../../Authentication/authUser';
import { Form } from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const areas = [
    {
        id:1,
        zone:"A",
        shape: "poly",
        coords: [235, 137, 235, 152, 216, 152, 212, 181, 221, 183, 217, 213, 284, 224, 295, 147],
        preFillColor: "#e5787c",
        fillColor: "#7fb775"
    },
    {
        id:2,
        zone:"B",
        shape: "poly",
        coords: [86, 157, 88, 174, 82, 176, 84, 199, 98, 196, 102, 214, 190, 201, 180, 139],
        preFillColor: "#e5787c",
        fillColor: "#7fb775"
    },
    {
        id: 3,
        zone:"C",
        shape: "poly",
        coords: [11, 174, 42, 171, 63, 153, 59, 261, 6, 267],
        preFillColor: "#02f3af",
        fillColor: "#7fb775"
    },
    {
        id: 4,
        zone:"D",
        shape: "poly",
        coords: [11, 8, 63, 3, 66, 50, 63, 104, 15, 104],
        preFillColor: "#02f3af",
        fillColor: "#7fb775"
    },

    {
        id: 5,
        zone:"E",
        shape: "poly",
        coords: [67, 41, 64, 102, 154, 100, 156, 38],
        preFillColor: "#e7df8e",
        fillColor: "#7fb775"
    },
    {
        id:6,
        zone:"F",
        shape: "poly",
        coords: [157, 39, 154, 100, 250, 98, 250, 91, 264, 91, 291, 35],
        preFillColor: "#02f3af",
        fillColor: "#7fb775"
    },
    {
        id: 7,
        zone:"J",
        shape: "poly",
        coords: [15, 105, 63, 104, 63, 151, 41, 170, 11, 172],
        preFillColor: "#e7df8e",
        fillColor: "#7fb775"
    },

];

export function MapComponent() {
    const [query, setQuery] = useState(1);
    //  handle dialog
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Zone, setZone] = useState("");
    const [mapAreas, setMapAreas] = useState({
        name: "choose a floor",
        areas: [
            areas[0],
            areas[2],
            areas[3],
            areas[4],
            areas[5]
        ]
    });
    const [listZone, setListZone] = useState([]);

    const getZone=(floor)=> {
       let items=[];
        let areasToShow ;
        //setListZone([])
        getZoneList(floor).then(
            response=> {
               areasToShow= response.data.zoneDTOList.map((i, index)=> {
                    if( i.activated===true){
                        items.push(index);

                    }
                   return setListZone(items)
                })

            })
    }
    const GetStatusOfAllZones=(floorId,date)=> {
        let items=[];
        let areasToShow ;
        //setListZone([])
        CheckStatusOfAllZones(floorId,date ).then(
            response=> {
              console.log(response.data)
                areasToShow= response.data.map((i, index)=> {

                        items.push(i.totalReservation);
                        console.log("index :  "+index+"reserve"+i.totalReservation+"  perce:  "+i.bookedPercentage);
                         return setStatus(items)
                })
      console.log("itms", items.toString())

            })
    }

    const [status , setStatus]= useState([]);
    // arrays for name of zone, style, and statistics
    const [statistic, setStatistic] = useState({
        Zone: ["Zone d", "Zone j", "Zone c", "Zone e", "Zone f", "Zone b", "Zone a"],
        Style: ["span1", "span2", "span3", "span4", "span5", "span6", "span7"],
        Statistics: [0, 0, 0, 0, 0, 0, 0]
    });
    // to show maps when today is clicked
    const [showMaps, setShowMaps] = useState(false);

    // to update map areas when floor is clicked
    useEffect(() => {
        setQuery(Math.random());

    }, [mapAreas]);

    useEffect(() => {
        CheckStatusOfAllZones(1,startDate ).then(
            response=> {
                console.log(response.data)

            })

    }, []);
    // handle onclick sone
    const enterArea = (area) => {
        console.log(area);
        setZone(area.id);

        handleShow();
    }
   // todo fix double click to show zone
    // floor handle
    const handleClickFloor = (floor) => {
        GetStatusOfAllZones(floor, startDate)
        let areasToShow;
        setShowMaps(true);
        console.log(" listzone: "+ listZone.toString());
          getZone(floor);
         areasToShow = listZone.map(item => {
                 return areas[item]
             })
       setMapAreas({
              name: floor,
              areas: areasToShow
          });
    }

    const [message , setMessage]=useState("");
    const currentUser = AuthService.getCurrentUser();
    const  ConfirmBooking= ()=>{
            BookPlass(startDate, currentUser.id, Zone).then(
                response=> {
                    if (response.data.message=== "You already have booking on that day"){
                        setShow(false);
                        setMessage("You already have booking on that day");
                    }else {
                        setMessage(response.data.message);
                        setTimeout(() => {

                           setShow(false);
                           // todo routing to my booking
                        }, 2000);
                    }
                })
    }
    const today = new Date();
    const maxDate=new Date (new Date(today.getFullYear(), today.getMonth(), today.getDay()+7,today.getHours(),today.getMinutes(),today.getSeconds()));

    const [startDate, setStartDate] = useState(today);
    const date=startDate.getFullYear() +'-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();;
    return (
        <div className="container ">
            <div className="text ">
            <h2 className=" mr-5 mb-5">New booking</h2>
            <p className="float-left ml-3">Choose a date and Double click on a floor to show zone.</p>
            </div>

            <div className="col-md-6 ">

                <div className="mb-5">
                    {/* todo datapicker show under image when man choose a floor*/}
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        startDate={startDate}
                        minDate={startDate}
                        maxDate={maxDate}
                      className="btn btn-info position-fixed float-left"
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



                <div className="col d-sm-inline-block ">

                    {showMaps ?
                        <div className="" >
                            <ImageMapper
                                src={`${URL}?${query}`}
                                map={mapAreas}
                                width={300}
                                onClick={enterArea}
                            />
                            {statistic.Style.map((x, i) =>
                                <span className={statistic.Style[i]} key={i}>{statistic.Zone[i]}
                                    <br />
                                    {status[i]}%
                         </span>
                            )}
                        </div>
                        : <div>
                            <img src={URL} width={300} alt="map"/></div>}

                </div>
                <div className="col-6 d-sm-inline-block mt-4">
                    <div className="btn-group">
                        {[...Array(7)].map((x, i) =>
                            <button className="btn btn-light mt-1 ml-1 mr-1 " key={i}
                                onClick={() => handleClickFloor(i + 1)}>{i + 1}</button>
                        )}
                    </div>
                </div>

            </div>

        </div>

    );
}

