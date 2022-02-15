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
        dispatch(getBreedName(name));
        setName("")
    }

    return (
        <div className={styles.container}>
            <input type="text" value={name} placeholder="Insert a dog breed..." onChange={(e) => handleInput(e)} className={styles.input} />
            <button type="submit" onClick={(e) => handleSubmit(e)} className={styles.button} > Search</button>
        </div>
    )
}

