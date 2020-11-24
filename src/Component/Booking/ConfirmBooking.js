import React from "react";
import {Button, Form, Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function    BookDialog(props) {
    return (
        <>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={props.show } onHide={props.onHide}>

                <Modal.Body>
                    <div className=" mt-1 mb-1 center ">
                            <h2 className="  title"> Confirm Booking  </h2>
                    </div>
                    <p id="floor">Floor: {props.name}</p>
                    <p id="zone">Zone: {props.Zone}</p>
                    <p id="date">Date:  {  props.dates}   </p>

                    {props.loading ?
                        <div className="mt-2 container center">
                            <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">
                            </div>
                            <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">
                            </div>
                            <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">
                            </div>
                        </div>
                        : null}

                </Modal.Body>

                <Modal.Footer>


                    <Button variant="outline-danger" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button id="submitBooking" variant="outline-info" onClick={props.ConfirmBooking}>
                       Confirm Booking
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BookDialog;



