import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filterCreated, orderName, orderWeight, filterByTemp, getTemperaments } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import styles from "./Home.module.css";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); // esto es lo mismo que mapStateToProps, pero con hooks
  const [order, setOrder] = useState(""); // esto es solo un estado local para que me renderize el ordenamiento A-Z
  const [orderr, setOrderr] = useState(""); // esto es solo un estado local para que me renderize el ordenamiento weight
  // paginado
  //     declaro un estado local
  const [currentPage, setCurrentPage] = useState(1); // en uno porque siempre empeza en la página n1
  //     declaro otro estado local
  const [dogsPerPage, setDogsPerPage] = useState(8); // dogs por página
  const indexOfLastDog = currentPage * dogsPerPage;
  //    busco siempre el primer dog de la pagina
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);//0/8 (el ultimo es excluyente, por eso hay 8 del 0 al 7)

  const allTemp = useSelector((state) => state.temperaments)


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs()); // esto es lo mismo que mapDispatchToProps, pero con hooks
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs()); // esto es para volver a cargar todos la página
  }

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(orderWeight(e.target.value));
    setCurrentPage(1);
    setOrderr(`Ordenado ${e.target.value}`);
  }

  function handleSortByTemp(e) {
    e.preventDefault();
    dispatch(filterByTemp(e.target.value))
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE DOG API</h1>
      <div className={styles.filtersContainer}>
        <SearchBar />
        <Link to="/dog" className={styles.link}>Create a new dog breed</Link>
        <div className={styles.inputs}>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
            className={styles.remove}
          >
            Remove all filters
          </button>
          <select onChange={(e) => handleSortByName(e)} className={styles.selectA_Z}>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
          <select onChange={(e) => handleSortByWeight(e)} className={styles.selectWei}>
            <option value="menor_mayor">Weight: ascending</option>
            <option value="mayor_menor">Weight: descending</option>
          </select>
          <select onChange={(e) => handleSortByTemp(e)} className={styles.selectTemp}>
            <option value="">Filter by temperament</option>
            {allTemp.map((temp) => (
              <option key={temp.id} value={temp.name}>{temp.name}</option>
            ))}
          </select>
          <select onChange={(e) => handleFilterCreated(e)} className={styles.selectFilter}>
            <option value="all">Show all...</option>
            <option value="api">Existing</option>
            <option value="created">Created</option>
          </select>
        </div>

        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>
      <div className={styles.containerCards}>
        {currentDogs?.map((e) => {
          return (
            <div key={e.id} className={styles.cards}>
              <Link to={`/dogs/${e.id}`} className={styles.card}>
                <Card
                  name={e.name}
                  image={e.image}
                  temperament={!e.createdDb? e.temperament + ' ' : e.temperaments}
                  weight={e.weight + " kg"}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
