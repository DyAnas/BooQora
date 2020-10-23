import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    /*const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };*/

    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                maxWidth="lg"

                keepMounted
                onClose={props.onHide}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle color="primary" id="alert-dialog-slide-title">{props.Tittel}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
            {/*    <DialogActions>
                    <Button onClick={props.onHide} color="primary">
                        Ok
                    </Button>
                    <Button onClick={props.onHide} color="primary">
                        Cancel
                    </Button>
                </DialogActions>*/}
            </Dialog>
        </div>
    );
}
