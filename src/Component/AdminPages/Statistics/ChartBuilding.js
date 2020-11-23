import React, {useCallback, useEffect, useState} from "react";
import {Bar} from 'react-chartjs-2';
import {CheckStatusOfAllFloorPeriod} from "../../../service/AdminService/AdminStatistics";
import DatePicker from "react-datepicker";
import en from "date-fns/locale/en-GB";

const StatusBuilding = () => {
    const [barData, setBarData] = useState({
        labels: ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4', 'Floor 5', 'Floor 6', 'Floor 7'],
        datasets: [
            {
                label: "Quantity Status Build By floor",
                data: [],
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
    const barOptions = {
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            max: 200,
                            beginAtZero: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: "Quantity Status Build By floor",
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    const statusBuilding = (response) => {
        let item = []
        let color = []
        //   console.log(response.data)
        response.data.map((i, index) => {
            if (i.totalBooking < 30) {
                color[index] = 'rgba(75, 192, 192, 0.6)';
            } else if (i.totalBooking > 30 || i.totalBooking < 70) {
                color[index] = 'rgba(255, 206, 86, 0.6)';
            } else {
                color[index] = 'rgba(255, 99, 132, 0.6)';
            }
            return item.push(i.totalBooking);
        })
        // setData(item)


        setBarData({
            ...barData,
            datasets: [
                {
                    label: "Quantity Status Build By floor",
                    data: item,
                    backgroundColor: color,
                    borderWidth: 3
                }
            ]

        })

    }

    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);


    const fetchBooking = useCallback(() => {
        CheckStatusOfAllFloorPeriod(startDate, endDate).then(statusBuilding)
    }, [startDate, endDate,])
    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])

    return (
        <div className=" ">
            <div className=" mt-2 mb-2 center ">
                <div className="">
                    <h2 className=" title"> Status Building </h2>
                    <p className="text"> Choose a date to show status</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 labelsDate">
                    <h2 style={{fontSize: "20px"}} className="mr-3 labelsDate m-0">From </h2>
                    <DatePicker
                        id="dateFrom"
                        dateFormat="dd-MM-yyyy"
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
                        id="dateTo"
                        dateFormat="dd-MM-yyyy"
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        startDate={startDate}
                        locale={en}
                        showWeekNumbers
                        className="btn btn-info Calendar1 float-left"
                    />

                </div>
            </div>

            <div>
                <Bar
                    data={barData}
                    options={barOptions.options}
                    width={100}
                    height={85}
                />
            </div>
        </div>
    )

}

export default StatusBuilding;