import React, {useEffect, useState} from "react";
import ReactApexChart from 'apexcharts'
import { Bar, Line, Pie } from 'react-chartjs-2';
const datas= [
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,

]
const  StatusFloor =()=>{
  const [data, setData]=useState(datas)
    const [floor, setFloor]=useState("")
    const [barData, setBarData] = useState({
        labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E', 'Zone F', 'Zone G'],
        datasets: [
            {
                label: "Status Floor By Zone",
                data:datas,
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
                text: 'Status Floor ' + floor+' By Zone',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    });
    const statusFloor= ()=> {
        setData([333,4,23,5,6,33,23]) // todo data is array from api
        setBarData({
            ...barData,
            datasets: [
                {
                    label: "Status Floor By Zone",
                    data:data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderWidth: 3
                }
            ]

        })

    }
    const handleClickFloor= (floor)=> {
        statusFloor();
        setFloor(floor)
     //   setData([1,2,3,4,5,6,7])


        console.log(data.toString())
    }

    useEffect(()=> {

   }, [ barData]);

    return (


            <div className="container">

                <h2> Status floor</h2>
                <div className="dropdown">
                    <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        floor: {floor}
                    </button>
                    <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                        {[...Array(7)].map((x, i) =>
                            <a className="dropdown-item " href="#" key={i}
                                    onClick={() => handleClickFloor(i + 1)} >{i + 1}</a>
                        )}
                    </div>

                </div>
                <Bar
                    data={barData}
                    options={barOptions.options} />
            </div>
        )

}

        export default StatusFloor;