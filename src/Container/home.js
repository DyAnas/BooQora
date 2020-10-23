import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EmailIcon from "@material-ui/icons/Email";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import SettingsIcon from "@material-ui/icons/Settings";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { grey } from "@material-ui/core/colors";
import Button from "@material-ui/core";
import Logo from "../assets/Logo2.png"
import AuthService from "../Authentication/authUser";
import {Router, Switch,  Link, Route} from "react-router-dom";
import { createBrowserHistory } from "history";
import { NextPage } from '../Test to delete/nextpage'
import {ProtectedRoute} from "../Authentication/protectedRoute";
import SignInContainer from "./SignInContainer";
import SignUpContainer from "./SignUpContainer";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EventNoteIcon from '@material-ui/icons/EventNote';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        backgroundColor: "#303030",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36,
        backgroundColor: "#303030",
        color: "inherit"
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        color: "#FFFFFF",
        backgroundColor: "#303030",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        color: "#FFFFFF",
        backgroundColor: "#303030",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 4),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    logo : {
        marginTop: -70,
        width:  20,
        height: 20
    }
}));

const history = createBrowserHistory();
export const MiniDrawer = (props) =>{
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (

        <div className={classes.root}>

            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open
                        })}
                    >

                        <MenuIcon style={{ color: grey[50] }} />
                    </IconButton>
                    <div className={classes.logo}> <img src={Logo} alt="logo" /></div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            >

                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon style={{ color: grey[50] }} />
                        ) : (
                            <ChevronLeftIcon style={{ color: grey[50] }} />
                        )}
                    </IconButton>

                </div>
                <Divider />
                <List>
                    <ListItem component={Link}
                              to="/next">
                        <ListItemIcon>
                            <AddCircleIcon style={{ color: grey[50] }} />
                        </ListItemIcon>
                        <ListItemText>New Booking</ListItemText>
                    </ListItem>

                    <ListItem button component={Link}
                              to="/next">
                        <ListItemIcon>
                            <EventNoteIcon style={{ color: grey[50] }} />
                        </ListItemIcon>
                        <ListItemText>My Booking</ListItemText>
                    </ListItem>

                    <ListItem button ocomponent={Link}
                                to="/next">
                        <ListItemIcon>
                            <InfoIcon style={{ color: grey[50] }} />
                        </ListItemIcon>
                        <ListItemText>About Bookora</ListItemText>
                    </ListItem>

                    <ListItem button onClick={() => {
                        AuthService.logout(); props.history.push('/')}} component={Link}
                              to="/" >
                        <ListItemIcon>
                            <ExitToAppIcon style={{ color: grey[50] }} />
                        </ListItemIcon>
                        <ListItemText> Sign Out</ListItemText>
                    </ListItem>
                </List>
            </Drawer>

            <main className={classes.content}>
                {props.children}
            </main>


                </div>




    );
}
