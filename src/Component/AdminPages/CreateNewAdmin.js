import React, {useState} from 'react';
import {Checkbox, TextField} from '@material-ui/core'
import "../../Styles/admin.css";
import {FindEmployee, UpgradeUserToAdmin} from '../../service/AdminService/AdminStatistics'
import {useHistory} from "react-router-dom";
import validateEmail from "../Login/ValidateEmail";
import {useForm} from "react-hook-form";


export const CreateNewAdmin = () => {
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [userFound, setUserFound] = useState(false)
    const [message, setMessage] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [checkBoxValueAdmin, setCheckBoxValueAdmin] = useState(false)
    const { register, handleSubmit, errors } = useForm();
    let roleToApi = [];


    const handleFindEmployee = () => {
        if (validateEmail(email)){
        FindEmployee(email).then(
            response => {
                console.log(response.data);
                setFirstname(response.data.firstName.toUpperCase())
                setLastname(response.data.lastName.toUpperCase())
                setEmail(response.data.email)
                setUserFound(true);

                setMessage("")

                if (response.data.role[0] === "ROLE_ADMIN" || response.data.role[1] === "ROLE_ADMIN") {
                    setCheckBoxValueAdmin(true)
                }
            },(error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if(error.response.status===404){

                    setUserFound(false);
                    setMessage("Email is not found")
                }else if(error.response.status===400){

                    setUserFound(false);
                    setMessage("Incorrect Email")
                }else if(error.response.status===401){
                    localStorage.clear()
                    history.push("/");
                    window.location.reload();
                    alert("You have been inactive for a while. For your security, please sign in again");
                }
                else {
                    setMessage(resMessage)
                }
               // setMessage(error.response.status)

            })

        } else {
            setMessage( "Email must match tietoEvry")
        }
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
        if (validateEmail(email)){
        UpgradeUserToAdmin(email, roleToApi).then(
            response => {
                setMessage(response.data.message)
                setUserFound(false);

            },(error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage);
                if(error.response.status===404){
                    setUserFound(false);
                    setMessage("Email is not found")
                }else if(error.response.status===400){

                    setUserFound(false);
                    setMessage("Incorrect Email")
                }else if(error.response.status===401){
                    localStorage.clear()
                    history.push("/");
                    window.location.reload();
                    alert("You have been inactive for a while. For your security, please sign in again");
                }

                 setMessage(resMessage)

            })

    } else {
        setMessage( "Email must match tietoEvry")
    }

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
                        <form style={{ width:"85%"}} onSubmit={handleSubmit(handleFindEmployee)} id="TestForm" data-test="submit-button" >
                        <TextField
                            name="email"
                            error={!!errors.email}
                            label="Email"
                            inputRef={register({
                                required: "Required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                                    message: "Invalid email"
                                }
                            })}
                            helperText={errors.email ? errors.email.message : ""}
                            type="email"
                            fullWidth
                            autocompleted="false"
                            size="small"
                            onChange={e => setEmail(e.target.value)}
                            variant="filled"
                            margin="normal"
                            id="input"
                            className="background_input w-75 center"

                        />
                        <strong style={{ color: "red" }}>{message}</strong>
                        <div>

                            <button
                                className="btn btn-light "
                            >Find</button>

                        </div>
                        </form>
                    </div>




                </div>
                {userFound ?
                    <div className="col col-sm-6 mx-auto  ">
                        <div className="table-responsive-sm">
                            <table className="table tableStyle">
                                <tbody>
                                    <tr>
                                        <th scope="row">First Name:</th>
                                        <td className="text-primary">{firstname}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Last Name:</th>
                                        <td className="text-primary">{lastname}</td>
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