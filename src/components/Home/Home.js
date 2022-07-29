import { Fragment } from "react";
import Card from "../UI/Card";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <Fragment>
      <Card className={styles.home}>
        <h1>Welcome Back!</h1>
      </Card>
    </Fragment>
  );
};
export default Home;
