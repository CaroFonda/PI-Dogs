import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedName } from "../actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInput(e) {
        e.preventDefault();      
        setName(e.target.value)    
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name.length === 0) {
            return alert("Please enter a valid name");
          } else {  
        dispatch(getBreedName(name))};
        setName("")
    }
   
    return (
        <div className={styles.container}>
            <input type="text" value={name} placeholder="Breed..." onChange={(e) => handleInput(e)} className={styles.input} />
            <button type="submit" onClick={(e) => handleSubmit(e)} className={styles.button} > Search</button>
        </div>
    )
}

