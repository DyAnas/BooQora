import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
//import { useTheme } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
   // const theme = useTheme();


    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                maxWidth="lg"
                className="vw-100"
                keepMounted
                onClose={props.onHide}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="p-3 mb-2 bg-info text-white" id="alert-dialog-slide-title">{props.Tittel}</DialogTitle>
                <DialogContent>
                    <DialogContentText className="text-md-left" id="alert-dialog-slide-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
               <DialogActions>
                   {props.showConfirmation &&
                    <Button onClick={props.resendConfirmation} className="btn-info">
                      resend confirmation
                    </Button>
                   }
               {/*      <Button onClick={props.onHide} color="primary">
                        Cancel
                    </Button>*/}
                </DialogActions>
            </Dialog>
        </div>
    );
}
