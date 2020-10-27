import React, {useState} from "react";
import Dialog from 'react-bootstrap-dialog';
import { Modal, Button,Form } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
function Example(props) {


    return (
        <>

            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Chose date </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h2>{props.name}</h2>
                    <p>Sone: {props.index}</p>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group controlId="dob">
                                <Form.Label>Select Date</Form.Label>
                                <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                            </Form.Group>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.onHide}>
                       Confirm Booking
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;



