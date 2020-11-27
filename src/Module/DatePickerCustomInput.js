import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";


export default class DatePickerCustomInput extends React.Component {
    render() {
        return (
            <div className="wrapper ">

                <i onClick={this.props.onClick} style={{ color: "#16a596" }} aria-hidden="true" className="fa fa-calendar"><FontAwesomeIcon icon={faCalendarAlt} /></i>
                <input style={{ width: "60%" }} onClick={this.props.onClick} className="dateInput " onChange={this.props.onChange} value={this.props.value} type="text" />
            </div>
        )
    }
}