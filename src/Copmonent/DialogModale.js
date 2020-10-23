import React from "react";
import { Modal, Button,Form } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
function DialogAlert(props) {


    return (
        <>
            <Modal show={props.show} onHide={props.onHide}
                   aria-labelledby="contained-modal-title-vcenter "
                   centered
                   size="md"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.Tittel}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{props.message}</p>
                    {props.children}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.onHide}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DialogAlert;



