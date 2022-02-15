import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i + 1);//para que arranque en la pág 1, sino arrancaba en pág 0
  }

  return (
    <nav className={styles.container}>
      <ul className={styles.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div className={styles.listContainer} key={number}>
              <li className={styles.number} key={number}>
                <button onClick={() => paginado(number)} className={styles.link}>{number}</button>
              </li>
            </div>
          ))}
      </ul>
    </nav>
  );
}
