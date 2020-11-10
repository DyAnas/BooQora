import React, {useEffect, useState} from "react";
import { NavBar } from "../../Container/Navbar";
import "../../Styles/admin.css";
import {getZoneList} from "../../service/mapService";
import {ChangeZone} from "../../service/ZoneSetting";

export const ZoneSettings = () => {
    const [edit, setEdit] = useState(false);
    const [floor, setFloor]=useState(1)
    const [Zone, setZone]= useState([])
    const [ZoneID, setZoneID]= useState()
    const [Capacity, setCapacity]= useState()
    const [Active, setActive]= useState("")
    const [ChooseZone, setChooseZone]=useState("Choose Zone")
    const getAllZones= ()=> {
        let items=[]
        getZoneList(floor).then(response=> {
            console.log(response.data)
            response.data.zoneDTOList.map((i, index)=> {
                items.push(i)
            })
            console.log("items"+items)
            console.log("Zones"+Zone)
           return  setZone(items)

        })

    }
    const HandlerZone=(Zone)=> {
        setZoneID(Zone.id);
        setCapacity(Zone.capacity);
        setActive(Zone.activated)
        setChooseZone(Zone.zone)


    }
    const handleCheckBox= (event)=> {
        console.log(event.target.checked)
       setActive(event.target.checked)
    }
    const handleClickFloor=(floor)=> {
        setFloor(floor);
        setEdit(true)

    }
    const HandleSaveSetting=()=> {
        console.log(Active);
        console.log(ZoneID);
        console.log(floor);
        console.log(Capacity);

        ChangeZone(floor, ZoneID,Capacity, Active).then(
            response=> {
                console.log(response.data.message)
            })

    }

    useEffect(()=> {
     getAllZones()
    }, [floor]);
    return <div>
        <div className="container  ">
            <NavBar />

            <div className="row text-center d-block mx-auto mainRow " >

                <h3 className=" mb-5 ">Zone Settings</h3>
                <div className=" col " >
                    <h5 className="">Choose a floor to edit</h5>
                    <div className="btn-group">
                        {[...Array(7)].map((x, i) =>
                            <button className="btn btn-light mt-4 " key={i}
                                onClick={() => handleClickFloor(i+1)}   >{i + 1}</button>
                        )}
                    </div>
                </div>
               
                {edit ? <div className="row text-center d-block  " >
                    <div className="col-md-4 mx-auto  " style={{ backgroundColor: "#e1f2fb", borderRadius: "20px", padding: "15px", margin: "3px" }}>
                        <form >
                            <div className="form-group p-2">
                                <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {ChooseZone}
                                    </button>

                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                        {Zone.map((i, index )=>
                                        <a key ={i.id} onClick={()=> HandlerZone(i)} className="dropdown-item" href="#">{i.zone} </a>

                                        )}
                                    </div>
                                </div>

                            </div>
                            <div className="form-group ">
                                <div className="table-responsive-sm">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Capacity: </th>
                                                <td><input type="number"
                                                           onChange={event => setCapacity(event.target.value)}
                                                           value={Capacity} className="form-control" size="1" id="exampleDropdownFormPassword1" placeholder="Capacity" /></td>

                                            </tr>
                                            <tr>
                                                <th scope="row">Accesibility:</th>
                                                <td >
                                                    <input type="checkbox"
                                                           className="form-check-input"
                                                           id="activeCheck"
                                                           checked={Active}
                                                    onClick={(event)=> handleCheckBox (event)}/>
                                                    <label className="form-check-label" ><strong>Active</strong></label>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <button
                                onClick={HandleSaveSetting}
                                type="submit" className="btn btn-light mr-2">Save</button>
                            <button className="btn btn-light">Cancel</button>
                        </form>
                    </div>

                </div> : null}
            </div>

        </div>
    </div>

}