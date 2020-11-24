import React, {useEffect, useState} from "react";
import "../../Styles/admin.css";
import {getZoneList} from "../../service/BookingService/mapService";
import {ChangeZone} from "../../service/AdminService/ZoneSetting";
import {Checkbox} from '@material-ui/core'
import { withRouter} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ZoneSettings = (props) => {
    const [edit, setEdit] = useState(false);
    const [floor, setFloor] = useState(1)
    const [Zone, setZone] = useState([])
    const [ZoneID, setZoneID] = useState()
    const [Capacity, setCapacity] = useState("")
    const [Active, setActive] = useState(false)
    const [ChooseZone, setChooseZone] = useState("Choose Zone")

    useEffect(() => {

        setChooseZone("Choose Zone");
        setCapacity(0)
        let items = []
        getZoneList(floor).then(response => {
            response.data.zoneDTOList.map((i, index) => {
                return items.push(i)})
            return setZone(items)
        }, (error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            if(error.response.status===401){


                toast.error("You have been inactive for a while. For your security, please sign in again", {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                 
                })
                 /* istanbul ignore next */
                setTimeout(() => {
                    localStorage.clear()
                    window.location.reload()
                }, 8000);

               
            }else {
                /* istanbul ignore next */
                toast.error(resMessage, {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
             
            })}

        })


    }, [floor]);

    const handlerZone = (Zone) => {
        setZoneID(Zone.id);
        setCapacity(Zone.capacity);
        setActive(Zone.activated)
        setChooseZone(Zone.zone)


    } /* istanbul ignore next */
    const handleCheckBox = (event) => {

        setActive(event.target.checked)
    }
    const handleClickFloor = (floor) => {

        setFloor(floor);
        setEdit(true)


    }

    const handleSaveSetting = () => {
        ChangeZone(floor, ZoneID, Capacity, Active).then(
            response => {
                 /* istanbul ignore next */
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } , (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(error.response.status)
                if(error.response.status===401){
                    toast.error("You have been inactive for a while. For your security, please sign in again", {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,

                    })
                  
                     /* istanbul ignore next */
                    setTimeout(() => {
                        localStorage.clear()
                        window.location.reload()
                    }, 8000);

                }else{
                toast.error(resMessage, {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    
                })
                }


            })

    }


    return <div className="">
        <div className="container  ">
            <div className="row text-center d-block mx-auto box  " >

                <div className=" mt-4 mb-4 center ">
                    <div className="">
                        <h2 className="  title"> Zone Settings </h2>
                    </div>
                </div>
                <div className=" col " >
                    <ToastContainer
                        position="top-center"
                       />
                    <div className="btn-group">
                        {[...Array(7)].map((x, i) =>
                            <button className="btn btn-light mt-4 " key={i}
                                onClick={() => handleClickFloor(i + 1)}   >{i + 1}</button>
                        )}
                    </div>
                </div>

                {edit ? <div className="row text-center d-block  " >
                    <div className="col-md-4 mx-auto  " style={{ backgroundColor: "#e1f2fb", borderRadius: "20px", padding: "15px", margin: "3px" }}>
                        <form >

                            <div className="form-group ">
                                <div className="table-responsive-sm">
                                    <table className="table ">

                                        <tbody>
                                            <tr>
                                                <th scope="row" >Floor Nr: </th>
                                                <td><strong>{floor}</strong></td>
                                            </tr>

                                            <tr>
                                                <th scope="row">Zone: </th>
                                                <td>
                                                    <div className="dropdown">

                                                        <button className="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            {ChooseZone}
                                                        </button>

                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                                            {Zone.map((i, index) =>
                                                                <a href="#" key={i.id} onClick={() => handlerZone(i)} className="dropdown-item"> {"Zone (" + i.zone + ")"} </a>

                                                            )}

                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>


                                            <tr>
                                                <th scope="row">Capacity: </th>
                                                <td >
                                                    <input type="number"
                                                        onChange={event => setCapacity(event.target.value)}
                                                        value={Capacity}
                                                        className="form-control"
                                                        size="1"
                                                        id="capacityInput"
                                                        placeholder="Capacity" 
                                                        style={{maxWidth:"45%"}}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Accesibility:</th>
                                                <td >
                                                    <Checkbox
                                                        className="form-check-input"
                                                        id="accesibility"
                                                        checked={Active}
                                                        onChange={(event) => handleCheckBox(event)}
                                                        name="checkedB"
                                                        color="primary"
                                                        label="Active"
                                                    />

                                                    <label className="form-check-label" ><strong>Active</strong></label>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <button
                                id="save"
                                onClick={handleSaveSetting}
                                type="submit" className="btn btn-light mr-2">Save</button>
                            <button className="btn btn-light">Cancel</button>
                        </form>
                    </div>

                </div> : null}
            </div>

        </div>
    </div>

}
export default withRouter(ZoneSettings);