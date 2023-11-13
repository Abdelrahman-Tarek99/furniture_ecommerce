import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import "../../App.css";
import classes from "./Button.module.css";

function Button(props) {
    return (
        <React.Fragment>
            <button type={props.type || 'button'} className={`${classes.button} ${props.className}`} onClick={props.onClick} >{props.children}</button>
        </React.Fragment>
    )
}

export default Button;