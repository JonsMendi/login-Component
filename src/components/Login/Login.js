import { Fragment, useState, useEffect, useReducer, useContext } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./Login.module.css";
import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "INPUT_MAIL") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "INPUT_PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR_PASSWORD") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [validateEmail, setValidateEmail] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [validatePassword, setValidatePassword] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchedEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchedPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const ctx = useContext(AuthContext);

  // Under we are not assigning a new value to "isValid". When we are destructuring and object we can use this
  // technique to give different names for the same value (can be very handy);
  // this will then used in useEffect dependencies to re-run just when the "isValue" key changed,
  //instead of all the object keys (in this case the other key is "value").
  const { isValid: emailOperation } = emailState;
  const { isValid: passwordOperation } = passwordState;

  useEffect(
    () => {
      // useEffect, as known, let us write code that is not re-rendered every time the page is loaded.
      // just loads one time in the beginning...unless that we define in the dependencies ("[]") that something should
      // be re-checked.

      // In this case we moved setFormIsValid to useEffect to have it written just one time (instead of multiple times
      // in each function handler.
      // And then, in the useEffect dependencies ("[]") we place the name of the variables, that, in this case
      // should be re-checked.

      // To have a better control of all the operation we should use the setTimeout.
      // Like that, we debounce being sure that setTimeout will just run on time after the user stop to type.
      // Otherwise the function will re-run for every single word/number/whatever.
      // And that is possible to reach using the clearTimeout in the so called "clean up" function

      const checkValidation = setTimeout(() => {
        console.log("Checking validation");
        setFormIsValid(emailOperation && passwordOperation);
      }, 500);

      // Under, the "clean up" functions enables that we can "clear" the setTimeout.
      return () => {
        console.log("Checking clear timeout");
        clearTimeout(checkValidation);
      };
    },
    // In this case makes sense to re-check this variables for useEffect re-checked just, when the value of password or email changes.
    [emailOperation, passwordOperation]
  );

  // to create a validation criteria we need to set this method for each input field
  // eah one with is own rules.
  const validationEmailHandler = () => {
    dispatchedEmail({ type: "INPUT_BLUR" });
  };

  // to create a validation criteria we need to set this method for each input field
  // eah one with is own rules.
  const validationPasswordHandler = () => {
    dispatchedPassword({ type: "INPUT_BLUR_PASSWORD" });
  };

  // then, in the entered handler we need to check if it validated calling the setFormValid to allow
  // or not through a boolean.
  const enteredEmailHandler = (event) => {
    dispatchedEmail({ type: "INPUT_MAIL", val: event.target.value });

    setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  // then, in the entered handler we need to check if it validated calling the setFormValid to allow
  // or not through a boolean.
  const enteredPasswordHandler = (event) => {
    dispatchedPassword({ type: "INPUT_PASSWORD", val: event.target.value });

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Fragment>
      <Card className={styles.login}>
        <form onSubmit={onSubmitHandler}>
          <Input
            label="E-Mail:"
            isValid={emailOperation}
            type="email"
            id="email"
            value={emailState.value}
            onChange={enteredEmailHandler}
            onBlur={validationEmailHandler}
          ></Input>
          <Input
            label="Password:"
            isValid={passwordOperation}
            type="password"
            id="password"
            value={passwordState.value}
            onChange={enteredPasswordHandler}
            onBlur={validationPasswordHandler}
          ></Input>

          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Login
          </Button>
        </form>
      </Card>
    </Fragment>
  );
};
export default Login;
