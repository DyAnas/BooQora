import React, { useState } from 'react';
import { Checkbox, TextField } from '@material-ui/core'
import "../../Styles/admin.css";
import { FindEmployee, UpgradeUserToAdmin } from '../../service/AdminService/AdminStatistics'
import { useHistory } from "react-router-dom";
import validateEmail from "../Login/ValidateEmail";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";


export const CreateNewAdmin = () => {
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [userFound, setUserFound] = useState(false)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [checkBoxValueAdmin, setCheckBoxValueAdmin] = useState(false)
    const { register, handleSubmit, errors } = useForm();
    let roleToApi = [];


    const handleFindEmployee = () => {
        if (validateEmail(email)) {
            FindEmployee(email).then(
                response => {

                    setFirstname(response.data.firstName.toUpperCase())
                    setLastname(response.data.lastName.toUpperCase())
                    setEmail(response.data.email)
                    setUserFound(true);
                    toast.error(response.data.message, {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    if (response.data.role[0] === "ROLE_ADMIN" || response.data.role[1] === "ROLE_ADMIN") {
                        setCheckBoxValueAdmin(true)
                    }
                }, (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    if (error.response.status === 404) {

                        setUserFound(false);
                        toast.error("Email is not found", {
                            position: "top-center",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    } else if (error.response.status === 400) {

                        setUserFound(false);

                        toast.error("Incorrect Email", {
                            position: "top-center",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    } else if (error.response.status === 401) {
                        localStorage.clear()
                        toast.error("You have been inactive for a while. For your security, please sign in again", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        setTimeout(() => {
                            history.push("/");
                        }, 5000)

                    }
                    else {
                        toast.error(resMessage, {
                            position: "top-center",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }
                    // setMessage(error.response.status)

                })

        } else {

            toast.error("Email must match tietoEvry", {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
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

        UpgradeUserToAdmin(email, roleToApi).then(
            response => {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setUserFound(false);

            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                if (error.response.status === 404) {
                    setUserFound(false);
                    toast.error("Email is not found", {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else if (error.response.status === 400) {

                    setUserFound(false);

                    toast.error("Incorrect Email", {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else if (error.response.status === 401) {
                    localStorage.clear()

                    //                        window.location.reload();
                    toast.error("You have been inactive for a while. For your security, please sign in again", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    setTimeout(() => {
                        history.push("/");
                    }, 5000)


                } else {

                    toast.error(resMessage, {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                }

            })

    }


return <div className="container  ">
    <div className="row text-center d-block mx-auto mainRow " >

        <div className=" mt-4 mb-4 center ">
            <div className="">
                <h2 className="  title"> Upgrade a user to admin </h2>
            </div>
        </div>
        <div className=" col " >
            <ToastContainer
                position="top-center"
                autoClose={8000} />

        </div>
        < div className="row text-center d-block  " >

            <div className="col col-sm-6 mx-auto   " style={{ borderRadius: "20px", padding: "15px", margin: "3px" }}>

                <div className="d-flex justify-content-center center flex-column">

                    <strong className="title" >Find User:</strong>
                    <form style={{ width: "85%" }} onSubmit={handleSubmit(handleFindEmployee)} id="TestForm" data-test="submit-button" >
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
                                    <td className="text-primary" id="lastName">{lastname}</td>
                                </tr>
                                <tr>

                                    <th scope="row">Email:</th>
                                    <td className="text-primary" id="email">{email}</td>
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
                    <button id="cancel" className="btn btn-light" onClick={() => { setUserFound(false) }}>Cancel</button>

                </div> : null}
        </div>
    </div>
</div >
}