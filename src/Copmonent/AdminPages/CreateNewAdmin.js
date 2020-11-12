import React, { useEffect, useState } from 'react';
import { NavBar } from "../../Container/Navbar";
import { Checkbox, TextField } from '@material-ui/core'
import "../../Styles/admin.css";
import { getAllEmployee } from '../../service/AdminStatistics'


export const CreateNewAdmin = () => {

    const [roleAdmin, setRoleAdmin] = useState(false)
    const [email, setEmail] = useState("")
    const [userFound, setUserFound] = useState(false)
    const [employeeList, setEmployeeList] = useState([]);
    const [message, setMessage] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [role, setRole] = useState("")


    useEffect(() => {
        getAllEmployee().then(response => {

            setEmployeeList(response.data.employeeDTOList);

        })
    }, [])



    const handleFindEmployee = () => {

        for (let i = 0; i < employeeList.length; i++) {
            if (employeeList[i].email === email) {
                setFirstname(employeeList[i].firstName)
                setLastname(employeeList[i].lastName)
                setEmail(employeeList[i].email)
                setRole(employeeList[i].role)
                setUserFound(true);
                setMessage("")
                break;
            }
            else{
                setMessage("User Not Found!!")
                setUserFound(false);
            }
          
           
        }}

        const handleCheckBox = (event) => {
            setRoleAdmin(event.target.checked);
        }

        const HandleUpgradeUser = (event) => {


        }





        return <div className="container  ">
            <NavBar />

            <div className="row text-center d-block mx-auto mainRow " >

                <h3 className=" mb-4 ">Upgrade a user to admin</h3>
                <div className=" col " >


                </div>
                < div className="row text-center d-block  " >

                    <div className="col col-sm-6 mx-auto   " style={{ borderRadius: "20px", padding: "15px", margin: "3px" }}>

                        <div className="d-flex justify-content-center flex-column">

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
                                className="background_input"
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
                                                checked={roleAdmin}
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