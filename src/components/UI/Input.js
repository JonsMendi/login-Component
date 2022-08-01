import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  // to create a focus in the field that need to have some specific input
  // we create a reference "inputReference" that is connected as props in the ref input field(jsx).
  const inputReference = useRef();

  // activate function will focus the inputReference that will be called in Login.js through useImperativeHandle
  // and React.forwardRef
  const activate = () => {
    inputReference.current.focus();
  };

  // useImperativeHandle define which methods can be executed outside of this component.
  // In this case is the "activate" method, that can be called in other component as "lightUpInput"
  useImperativeHandle(ref, () => {
    return { lightUpInput: activate };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        //under "ref" passed as props to allow useImperativeHandle
        ref={inputReference}
        type={props.type || "text"}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    </div>
  );
});
export default Input;
