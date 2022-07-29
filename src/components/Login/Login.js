import { Fragment, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Login.module.css";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [validateEmail, setValidateEmail] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

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

    //here we check if the inserted input by the user follow the same rules entered in the validation handler.
    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  // then, in the entered handler we need to check if it validated calling the setFormValid to allow
  // or not through a boolean.
  const enteredPasswordHandler = (event) => {
    setEnteredPassword(event.target.value);

    //here we check if the inserted input by the user follow the same rules entered in the validation handler.
    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
    console.log(onSubmitHandler);
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
              type="text"
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
