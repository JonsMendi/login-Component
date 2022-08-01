import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./Navigation.module.css";

// With all the AuthContext defined and read to use we just need use the useContext().
// Accessing it to the "AuthContext" where is located the updated state.
// Attache is value to a variable (ctx) and then access through it in jsx (ex: ctx.isLoggedIn).

const Navigation = (props) => {
  const ctx = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navigation;
