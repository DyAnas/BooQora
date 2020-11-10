import React, {useEffect, useState} from "react";

import { Bar} from 'react-chartjs-2';
import {CheckStatusOfAllZones} from "../../service/mapService";
import DatePicker from "react-datepicker";

const  StatusFloor =()=>{
  const [data, setData]=useState([])
    const [floor, setFloor]=useState(1)
    const [barData, setBarData] = useState({
        labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E', 'Zone F', 'Zone G'],
        datasets: [
            {
                label: "Status Floor" + floor+"By Zone",
                data:[],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderWidth: 3
            }
        ]
    });
// set options
    const [barOptions, setBarOptions] = useState({
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Status Floor ' + 1+' By Zone',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    });
    const [colors, setColors]=useState([])
    const statusFloor= ()=> {
        let item =[]
        let color= []
        CheckStatusOfAllZones(floor, startDate).then(response => {
            console.log(response.data)
            response.data.map((i, index)=> {
                item.push(i.bookedPercentage)
                if (i.bookedPercentage < 30 ){
                    color[index]=  'rgba(75, 192, 192, 0.6)';
                }else if (i.bookedPercentage >30 || i.bookedPercentage < 70){
                    color[index]=  'rgba(255, 206, 86, 0.6)';
                }else {
                    color[index]=   'rgba(255, 99, 132, 0.6)';
                }
            })
            setData(item)
            setColors(color)
        })
        setBarOptions({
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                },
                title: {
                    display: true,
                    text: 'Status Floor ' + floor+' By Zone',
                    fontSize: 25
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        })

        setBarData({
            ...barData,
            datasets: [
                {
                    label:  "Status Floor " + floor+" By Zone",
                    data:data,
                    backgroundColor: colors,
                    borderWidth: 3
                }
            ]

        })

    }

    const today = new Date();
    const [startDate, setStartDate] = useState(today);

    useEffect(()=> {
       statusFloor();
   }, [startDate , floor]);
    // today and maxDate to show in calendar


    return (


            <div className="container ">
                    <h2> Status Floor </h2>
                <p className="text"> Choose a date and floor to show status</p>
                <div className="row">
                <div className="col-sm-5">
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    startDate={startDate}

                    className="btn btn-info Calendar1 float-left"
                />
                </div>
                    <div className="col-sm-5 ml-2">
                <div className="dropdown">
                    <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        floor: {floor}
                    </button>
                    <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                        {[...Array(7)].map((x, i) =>
                            <a className="dropdown-item " href="#" key={i}
                                    onClick={() => setFloor(i+1)} >{i + 1}</a>
                        )}


                    </div>
                </div>
                    </div>
                </div>
                <Bar
                    data={barData}
                    options={barOptions.options} />
            </div>
        )

}

        export default StatusFloor;