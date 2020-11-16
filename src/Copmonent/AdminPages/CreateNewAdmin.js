import React, { useState } from 'react';
import { NavBar } from "../../Container/Navbar";
import { Checkbox, TextField } from '@material-ui/core'
import "../../Styles/admin.css";
import { FindEmployee, UpgradeUserToAdmin } from '../../service/AdminStatistics'



export const CreateNewAdmin = () => {


    const [email, setEmail] = useState("")
    const [userFound, setUserFound] = useState(false)
    const [message, setMessage] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [checkBoxValueAdmin, setCheckBoxValueAdmin] = useState(false)
    let roleToApi = [];


    const handleFindEmployee = () => {
        FindEmployee(email).then(
            response => {
                console.log(response.data);
                setFirstname(response.data.firstName)
                setLastname(response.data.lastName)
                setEmail(response.data.email)
                setUserFound(true);

                setMessage("")

                if (response.data.role[0] === "ROLE_ADMIN" || response.data.role[1] === "ROLE_ADMIN") {
                    setCheckBoxValueAdmin(true)
                }
            }, error => { //Need return from API
                console.log(error);
                setMessage(error.data.message)
                setUserFound(false);
            });

    }




    const handleCheckBox = (event) => {


        setCheckBoxValueAdmin(event.target.checked);


    }

    const HandleUpgradeUser = () => {
        roleToApi = [];
        if (!checkBoxValueAdmin) {
            roleToApi[0] = "user"

        } else {
            roleToApi = ["user", "admin"]

        }
        UpgradeUserToAdmin(email, roleToApi).then(
            response => {
                console.log(response.data);
                setMessage(response.data.message)
                setUserFound(false);

            }, error => {

                setMessage(error.data.message);
                //     setUserFound(false);
            })


    }





    return <div className="container  ">
        <div className="row text-center d-block mx-auto mainRow " >

            <h3 className=" mb-4 mt-5 title">Upgrade a user to admin</h3>
            <div className=" col " >


            </div>
            < div className="row text-center d-block  " >

                <div className="col col-sm-6 mx-auto   " style={{ borderRadius: "20px", padding: "15px", margin: "3px" }}>

                    <div className="d-flex justify-content-center center flex-column">

                        <strong >Find User:</strong>

                        <TextField
                            name="email"
                            id="email"
                            label="Email"
                            type="email"
                            size="small"
                            onChange={e => setEmail(e.target.value)}
                            variant="filled"
                            margin="normal"
                            className="background_input  w-50"
                        />
                        <strong style={{ color: "red" }}>{message}</strong>
                        <div>

                            <button
                                className="btn btn-light "
                                onClick={handleFindEmployee}
                            >Find</button>

                        </div>
                    </div>




                </div>
                {userFound ?
                    <div className="col col-sm-6 mx-auto  ">
                        <div className="table-responsive-sm">
                            <table className="table tableStyle">
                                <tbody>
                                    <tr>
                                        <th scope="row">First Name:</th>
                                        <td className="text-primary">{firstname.toUpperCase()}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Last Name:</th>
                                        <td className="text-primary">{lastname.toUpperCase()}</td>
                                    </tr>
                                    <tr>

                                        <th scope="row">Email:</th>
                                        <td className="text-primary">{email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Role: </th>
                                        <td><Checkbox
                                            className="form-check-input"
                                            id="activeCheck"
                                            checked={checkBoxValueAdmin}
                                            onChange={(event) => handleCheckBox(event)}
                                            name="checkedB"
                                            color="primary"
                                            label="Active"
                                        />
                                            <label className="form-check-label" ><strong style={{ fontSize: "14px" }}>Admin</strong></label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button
                            onClick={HandleUpgradeUser}
                            type="submit" className="btn btn-light mr-2">Save</button>
                        <button className="btn btn-light" onClick={() => { setUserFound(false) }}>Cancel</button>

                    </div> : null}
            </div>
        </div>
    </div >
}