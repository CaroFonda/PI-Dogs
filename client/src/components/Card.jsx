import React from "react";
import styles from "./Card.module.css";

export default function Card({ name, image, temperament, weight }) {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={image} alt="Img not found" />
      <h2 className={styles.title}>{name}</h2>
      <h3 className={styles.temp}>
        {(function (temperament) {
          if (typeof temperament === "string") {
            return temperament;
          }
          if (Array.isArray(temperament)) {
            let temp = temperament.map((e) => e.name);
            return temp.join(", ");
          }
        })(temperament)}
      </h3>
      <h3 className={styles.wei}>{weight}</h3>
    </div>
  );
}
