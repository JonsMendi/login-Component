import { Fragment, useState, useEffect } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Login.module.css";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [validateEmail, setValidateEmail] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

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
        setFormIsValid(
          enteredEmail.includes("@") && enteredPassword.trim().length > 6
        );
      }, 500);

      // Under, the "clean up" functions enables that we can "clear" the setTimeout.
      return () => {
        console.log("Checking clear timeout");
        clearTimeout(checkValidation);
      };
    },
    // In this case makes sense to re-check this variables for useEffect re-checked just, when the value of password or email changes.
    [enteredEmail, enteredPassword]
  );
  // to create a validation criteria we need to set this method for each input field
  // eah one with is own rules.
  const validationEmailHandler = () => {
    setValidateEmail(enteredEmail.includes("@"));
  };

  // to create a validation criteria we need to set this method for each input field
  // eah one with is own rules.
  const validationPasswordHandler = () => {
    setValidatePassword(enteredPassword.trim().length > 6);
  };

  // then, in the entered handler we need to check if it validated calling the setFormValid to allow
  // or not through a boolean.
  const enteredEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  // then, in the entered handler we need to check if it validated calling the setFormValid to allow
  // or not through a boolean.
  const enteredPasswordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Fragment>
      <Card className={styles.login}>
        <form onSubmit={onSubmitHandler}>
          <div
            className={`${styles.control} ${
              validateEmail === false ? styles.invalid : ""
            }`}
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={enteredEmailHandler}
              onBlur={validationEmailHandler}
            />
          </div>
          <div
            className={`${styles.control} ${
              validatePassword === false ? styles.invalid : ""
            }`}
          >
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={enteredPasswordHandler}
              onBlur={validationPasswordHandler}
            />
          </div>

          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Login
          </Button>
        </form>
      </Card>
    </Fragment>
  );
};
export default Login;
