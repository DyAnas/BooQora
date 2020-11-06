import React, { useState, useEffect } from "react";
import ImageMapper from "react-image-mapper";
import URL from '../../assets/map.jpg'
import Example from "./DialogAlert";
import "../../Styles/mapStyle.css";
import {getZoneList} from "../../service/mapService";
import AuthService from '../../Authentication/authUser';
const areas = [
    {
        id:"A",
        shape: "poly",
        coords: [235, 137, 235, 152, 216, 152, 212, 181, 221, 183, 217, 213, 284, 224, 295, 147],
        preFillColor: "#e5787c",
        fillColor: "#7fb775"
    },
    {
        id:"B",
        shape: "poly",
        coords: [86, 157, 88, 174, 82, 176, 84, 199, 98, 196, 102, 214, 190, 201, 180, 139],
        preFillColor: "#e5787c",
        fillColor: "#7fb775"
    },
    {
        id: "C",
        shape: "poly",
        coords: [11, 174, 42, 171, 63, 153, 59, 261, 6, 267],
        preFillColor: "#02f3af",
        fillColor: "#7fb775"
    },
    {
        id: "D",
        shape: "poly",
        coords: [11, 8, 63, 3, 66, 50, 63, 104, 15, 104],
        preFillColor: "#02f3af",
        fillColor: "#7fb775"
    },

    {
        id: "E",
        shape: "poly",
        coords: [67, 41, 64, 102, 154, 100, 156, 38],
        preFillColor: "#e7df8e",
        fillColor: "#7fb775"
    },
    {
        id:"F",
        shape: "poly",
        coords: [157, 39, 154, 100, 250, 98, 250, 91, 264, 91, 291, 35],
        preFillColor: "#02f3af",
        fillColor: "#7fb775"
    },
    {
        id: "J",
        shape: "poly",
        coords: [15, 105, 63, 104, 63, 151, 41, 170, 11, 172],
        preFillColor: "#e7df8e",
        fillColor: "#7fb775"
    },

];
const zone = [0,1,2,3,4,5,6]
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
    const [listZone, setListZone] = useState({
    floor: "",
       zone: []
    });
    /*const getZone=(floor)=> {
        let items;
        let areasToShow ;
       let r;
        let sp;
        setListZone({
            zone:[]
        })
        getZoneList().then(
            response=> {
                areasToShow= response.data.zoneDTOList.map((i, index)=> {
                    listZone.zone+= [i.floor, i.zone, i.activated, i.capacity, ";"];
                    if( i.floor===floor && i.activated===true){

                    console.log("zone :  "+i.zone+"  id:  "+i.id
                          +"index: "+index);


                    }

                })


                console.log(" listzone: "+ listZone.zone.toString());
            })



    }

*/
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

    // todo find solution to remove multi object from mapareas without copy areas every time
    // handle onclick sone
    const enterArea = (area) => {
        console.log(area);
        setZone(area.id);
        handleShow();
    }

    // floor 1 handle
    const handleClickFloor = (floor) => {
        let items = [];// must be like parameter from api
        let areasToShow;
        let statisticss = [10, 20, 30, 40, 50, 60, 10]; // must be like parameter from api
        setShowMaps(true);
      //  getZoneList();
      //  getZone(floor);
     /*   areasToShow = listZone.zone.map(item => {
            return areas[item]
        })

        setMapAreas({
            name: "Floor 1",
            areas: areasToShow
        });*/
        if (floor === 1) {
            items = [5, 0];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [0, 0, 0, 0, 87, 0, statisticss[6]]
            })
            setMapAreas({
                name: "Floor 1",
                areas: areasToShow
            });


        } else if (floor === 2) {
            items = [0, 1, 4, 5];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [0, 0, 0, statisticss[3], statisticss[4], statisticss[5], statisticss[6]]
            })

            setMapAreas({
                name: "Floor 2",
                areas: areasToShow
            });
        } else if (floor === 3) {
            items = [0, 1, 4, 5];

            areasToShow = items.map(item => {
                return areas[item]
            })

            setStatistic({
                ...statistic,
                Statistics: [0, 0, 0, statisticss[3], statisticss[4], statisticss[5], statisticss[6]]
            })
            setMapAreas({
                name: "Floor 3",
                areas: areasToShow
            });

        } else if (floor === 4) {
            items = [0, 1, 2,3, 4, 5];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [statisticss[0], 0, statisticss[2], statisticss[3], statisticss[4], statisticss[5], statisticss[6]]
            })
            setMapAreas({
                name: "Floor 4",
                areas: areasToShow
            });
        } else if (floor === 5) {
            items = [1, 2, 3, 4, 5];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [statisticss[0], 0, statisticss[2], statisticss[3], statisticss[4], statisticss[5], 0]
            })
            setMapAreas({
                name: "Floor 4",
                areas: areasToShow
            });
        } else if (floor === 6) {
            items = [2, 3, 4];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [statisticss[0], 0, statisticss[2], statisticss[3], 0, 0, 0, 0]
            })
            setMapAreas({
                name: "Floor 6",
                areas: areasToShow
            });
        } else if (floor === 7) {
            items = [3, 4];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [statisticss[0], 0, statisticss[2], 0, 0, 0, 0, 0]
            })
            setMapAreas({
                name: "Floor 7",
                areas: areasToShow
            });
        }
    }
    var today = new Date();
    const  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();




    return (
        <div className="container ">
            <div>
            <h2>New booking</h2>
            </div>
            <div className="row   top-row-btn">

                <div className="btn-group  " role="group"
                    aria-label="Basic example">
                    <button type="button" className="btn btn-light">{date}</button>
                    <button type="button" className="btn btn-light ml-2">Next</button>
                </div>
                <Example
                    show={show}
                    onHide={handleClose}
                    name={mapAreas.name}
                    Zone={Zone}
                />
            </div>
            <div className="row  ">

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
                                    {statistic.Statistics[i]}%
                         </span>
                            )}
                        </div>
                        : <div>
                            <img src={URL} width={300} alt="map"/></div>}

                </div>
                <div className="col-6 d-sm-inline-block ">
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

