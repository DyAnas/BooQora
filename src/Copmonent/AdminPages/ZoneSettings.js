import React, { useState } from "react";
import { NavBar } from "../../Container/Navbar";
import "../../Styles/admin.css";

export const ZoneSettings = () => {
    const [edit, setEdit] = useState(false);
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
                                onClick={() => setEdit(true)}   >{i + 1}</button>
                        )}
                    </div>
                </div>
               
                {edit ? <div className="row text-center d-block  " >
                    <div className="col-md-4 mx-auto  " style={{ backgroundColor: "#e1f2fb", borderRadius: "20px", padding: "15px", margin: "3px" }}>
                        <form >
                            <div class="form-group p-2">
                                <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Choose Zone
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Zone 1</a>
                                        <a class="dropdown-item" href="#">Zone 2</a>
                                        <a class="dropdown-item" href="#">Zone 3</a>
                                    </div>
                                </div>

                            </div>
                            <div class="form-group ">
                                <div class="table-responsive-sm">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Capacity: </th>
                                                <td><input type="text" class="form-control" size="1" id="exampleDropdownFormPassword1" placeholder="Capacity" /></td>

                                            </tr>
                                            <tr>
                                                <th scope="row">Accesibility:</th>
                                                <td >
                                                    <input type="checkbox" class="form-check-input" id="activeCheck" />
                                                    <label class="form-check-label" for="activeCheck"><strong>Active</strong></label>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <button type="submit" class="btn btn-light mr-2">Save</button>
                            <button className="btn btn-light">Cancel</button>
                        </form>
                    </div>

                </div> : null}
            </div>

        </div>
    </div>

}