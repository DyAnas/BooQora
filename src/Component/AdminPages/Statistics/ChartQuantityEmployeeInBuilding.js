import React, {useCallback, useEffect, useState} from "react";
import {Line} from 'react-chartjs-2';
import {CheckStatusOfAllFloorPeriod} from "../../../service/AdminService/AdminStatistics";
import DatePicker from "react-datepicker";
import en from "date-fns/locale/en-GB";

// eslint-disable-next-line no-unused-vars
const ChartQuantityEmployee = () => {
    const [barData, setBarData] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul','Aug','Sep', 'Nov','Dec'],
        type:'horizontalBar',
        datasets: [
            {
                label: "Quantity Status Build By floor",
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
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
                fontSize: 20
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
         console.log(response.data)
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
                    label: "Quantity Status Build By Month",
                    data: item,
                    backgroundColor: color,
                    borderWidth: 3
                }
            ]

        })

    }


    const [startDate, setStartDate] = useState(new Date());
    const to= new Date();
    to.setFullYear(to.getFullYear()+1)
    const fetchBooking = useCallback(() => {
        CheckStatusOfAllFloorPeriod(startDate, to).then(statusBuilding)
    }, [startDate,])
    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])
    console.log("from",startDate)
    console.log("to",to)
    return (
        <div className=" ">
            <div className=" mt-5 mb-2 center ">
                <div className="">
                    <h2 className=" title"> Status Building By Month </h2>
                    <p className="text"> Choose a year to show status</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 labelsDate">
                    <h2 style={{fontSize: "20px"}} className="mr-3 labelsDate m-0">Year </h2>
                    <DatePicker
                        id="dateYear"
                        showYearPicker
                        dateFormat="yyyy"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        startDate={startDate}
                        clearAriaLabel="From"
                        className="btn btn-info Calendar1 float-left"
                        locale={en}
                        showWeekNumbers
                    />
                </div>

            </div>

            <div>
                <Line

                    data={barData}
                    options={barOptions.options}
                    width={100}
                    height={85}
                />
            </div>
        </div>
    )

}

export default ChartQuantityEmployee;