import React from "react";

import Navigation from "./Navigation";
import styles from "./Header.module.css";

const MainHeader = (props) => {
  return (
    <header className={styles["main-header"]}>
      <h1>A Typical Page</h1>
      <Navigation onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;
