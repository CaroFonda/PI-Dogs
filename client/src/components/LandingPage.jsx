import React from "react";
import { Link } from "react-router-dom";
import landingDog from "../img/landing_dog1.png";
import styles from "./Landing.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE DOG API</h1>
      <div className={styles.btn_container2}>
        <Link to="/home">
          <button className={styles.btn}>Let's play</button>
        </Link>
      </div>
      <div className={styles.img_container}>
        <img
          className={styles.img}
          src={landingDog}
          alt="Landing img not found"
        />
      </div>
    </div>
  );
}
