import React from "react";
import classes from "./Input.module.css";

const Form = (props) => {
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type || "text"}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    </div>
  );
};
export default Form;
