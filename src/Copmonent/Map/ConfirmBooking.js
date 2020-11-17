import React from "react";
import { Modal, Button,Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import DialogActions from "@material-ui/core/DialogActions";
function    BookDialog(props) {
    return (
        <>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={props.show } onHide={props.onHide}>
                <Modal.Header  className="p-3 mb-2 bg-info text-white"  closeButton>
                    <Modal.Title>Confirm Booking </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                <h2>Floor: {props.name}</h2>
                    <p>Zone: {props.Zone}</p>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group controlId="dob">
                                <Form.Label >Date:  {  props.dates}   </Form.Label>
                            </Form.Group>
                        </div>
                        <div className="center col-md-6">
                            <p style={{ color: "red"}}>{props.messages}</p>

                        </div>
                    </div>
                    {props.loading ?
                        <div className="mt-2 container">
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
                    <Button variant="outline-info" onClick={props.ConfirmBooking}>
                       Confirm Booking
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BookDialog;



