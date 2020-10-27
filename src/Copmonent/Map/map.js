import React, {useState, useEffect} from "react";
import ImageMapper from "react-image-mapper";
import URL from '../../assets/map.jpg'
import Example from "./DialogAlert";
import "../Map/mapStyle.css";

const areas = [

    {
        id: 1,
        shape: "poly",
        coords: [11, 8, 63, 3, 66, 50, 63, 104, 15, 104],
        preFillColor: "#02f3af",
        fillColor: "#7fb775"
    },


    {
        id: 2,
        shape: "poly",
        coords: [15, 105, 63, 104, 63, 151, 41, 170, 11, 172],
        preFillColor: "#e7df8e",
        fillColor: "#7fb775"
    },

    {
        id: 3,
        shape: "poly",
        coords: [11, 174, 42, 171, 63, 153, 59, 261, 6, 267],
        preFillColor: "#02f3af",
        fillColor: "#7fb775"
    },

    {
        id: 4,
        shape: "poly",
        coords: [67, 41, 64, 102, 154, 100, 156, 38],
        preFillColor: "#e7df8e",
        fillColor: "#7fb775"
    },

    {
        id: 5,
        shape: "poly",
        coords: [157, 39, 154, 100, 250, 98, 250, 91, 264, 91, 291, 35],
        preFillColor: "#02f3af",
        fillColor: "#7fb775"
    },

    {
        id: 6,
        shape: "poly",
        coords: [86, 157, 88, 174, 82, 176, 84, 199, 98, 196, 102, 214, 190, 201, 180, 139],
        preFillColor: "#e5787c",
        fillColor: "#7fb775"
    },

    {
        id: 7,
        shape: "poly",
        coords: [235, 137, 235, 152, 216, 152, 212, 181, 221, 183, 217, 213, 284, 224, 295, 147],
        preFillColor: "#e5787c",
        fillColor: "#7fb775"
    },
];

export function MapComponent() {
    const [query, setQuery] = useState(1);
    //  handle dialog
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        handleShow();
    }

    // floor 1 handle
    const handleClickFloor = (floor) => {
        let items = [];// most be like parameter from api
        let areasToShow;
        let statisticss = [10, 20, 30, 40, 50, 60, 10]; // most be like parameter from api
        setShowMaps(true);
        if (floor === 1) {
            items = [ 4,6];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [0, 0, 0, 0, 87,0, statisticss[6]]
            })
            setMapAreas({
                name: "Floor 1",
                areas: areasToShow
            });


        } else if (floor === 2) {
            items = [3, 4, 5, 6];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [0,0,0,statisticss[3], statisticss[4], statisticss[5], statisticss[6]]
            })

            setMapAreas({
                name: "Floor 2",
                areas: areasToShow
            });
        } else if (floor === 3) {
            items = [3, 4, 5, 6];

            areasToShow = items.map(item => {
                return areas[item]
            })

            setStatistic({
                ...statistic,
                Statistics: [0,0,0,statisticss[3], statisticss[4], statisticss[5], statisticss[6]]
            })
            setMapAreas({
                name: "Floor 3",
                areas: areasToShow
            });

        } else if (floor === 4) {
            items = [0, 2, 3, 4, 5, 6];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [statisticss[0],0, statisticss[2], statisticss[3], statisticss[4], statisticss[5], statisticss[6]]
            })
            setMapAreas({
                name: "Floor 4",
                areas: areasToShow
            });
        } else if (floor === 5) {
            items = [0, 2, 3, 4, 5];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [statisticss[0], 0,statisticss[2], statisticss[3], statisticss[4], statisticss[5], 0]
            })
            setMapAreas({
                name: "Floor 4",
                areas: areasToShow
            });
        } else if (floor === 6) {
            items = [0, 3, 2];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [statisticss[0], 0, statisticss[2], statisticss[3],0,0, 0,0]
            })
            setMapAreas({
                name: "Floor 6",
                areas: areasToShow
            });
        } else if (floor === 7) {
            items = [0, 2];
            areasToShow = items.map(item => {
                return areas[item]
            })
            setStatistic({
                ...statistic,
                Statistics: [statisticss[0], 0,statisticss[2],0, 0, 0, 0,0]
            })
            setMapAreas({
                name: "Floor 7",
                areas: areasToShow
            });
        }
    }
    return (
        <div className="container vw-50 overflow-hidden   ml-1 ">
            <div className="btn-group  float-left ml-5 mt-2 justify-content-center" role="group"
                 aria-label="Basic example">
                <button type="button" className="btn btn-light">Today</button>
                {/*<button type="button" className="btn btn-light ml-2">Next</button>*/}
            </div>
            <Example
                show={show}
                onHide={handleClose}
                name={mapAreas.name}
            />

            <div className="row mt-5 p-1 ml-0 ">
                <div className="btn-group-vertical float-left ml-0 mr-4 mt-2">
                    {[...Array(7)].map((x, i) =>
                        <button className="btn btn-light mt-1 ml-1 mr-1 " key={i}
                                onClick={() => handleClickFloor(i + 1)}>{i + 1}</button>
                    )}
                </div>
                {showMaps &&
                <div className="container mt-4 float-right ml-5 position-absolute">
                    <ImageMapper
                        src={`${URL}?${query}`}
                        map={mapAreas}
                        width={300}
                        onClick={enterArea}
                    />
                    {statistic.Style.map((x, i) =>
                            <span className={statistic.Style[i]} key={i}>{statistic.Zone[i]}
                                <br/>
                                {statistic.Statistics[i]}%
                    </span>
                    )}
                </div>
                }
            </div>

        </div>

    );
}
