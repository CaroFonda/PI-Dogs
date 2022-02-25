import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDogs, getTemperaments } from "../actions/index";
import dog from "../img/dog5.png";
import styles from "./DogForm.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!input.wMin) {
    errors.wMin = "Min weight is required";
  } else if (input.wMin <= 0) {
    errors.wMin = "Min weight should be greater than zero";
  } else if (!input.wMax) {
    errors.wMax = "Max weight is required";
  } else if (input.wMax <= 0) {
    errors.wMax = "Max weight should be greater than zero";
  } else if (parseInt(input.wMin) >= parseInt(input.wMax)) {
    errors.wMax = "Max weight must be greater than Min";
  } else if (!input.hMin) {
    errors.hMin = "Min height is required";
  } else if (input.hMin <= 0) {
    errors.hMin = "Min height should be greater than zero";
  } else if (!input.hMax) {
    errors.hMax = "Max height is required";
  } else if (input.hMax <= 0) {
    errors.hMin = "Min height should be greater than zero";
  } else if (parseInt(input.hMin) >= parseInt(input.hMax)) {
    errors.hMax = "Max height must be greater than Min";
  } else if (!input.life_spanMin) {
    errors.life_spanMin = "Min life span is required";
  } else if (input.life_spanMin <= 0) {
    errors.life_spanMin = "Min life span should be greater than zero";
  } else if (!input.life_spanMax) {
    errors.life_spanMax = "Max life span is required";
  } else if (input.life_spanMax <= 0) {
    errors.life_spanMax = "Min life span should be greater than zero";
  } else if (parseInt(input.life_spanMin) >= parseInt(input.life_spanMax)) {
    errors.life_spanMax = "Max life span must be greater than Min";
  } else if (!input.image) {
    errors.image = "Please insert internet image URL";
  }
  return errors;
}

export default function CreateDogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    wMin: "",
    wMax: "",
    hMin: "",
    hMax: "",
    life_spanMin: "",
    life_spanMax: "",
    image: "",
    temperament: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, +e.target.value], //Adding + will convert a string to number. In this case, the value is a number(I have assigned by doing this: value={input.temperament[input.temperament.length - 1]) but it is a string, if I add a + it transforms it into a number.
    });
  }

  function handleDelete(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el !== e),
    });
  }

  function handleSubmit(e) {
    if (Object.keys(errors).length > 0) {
      document.getElementById("NoSubmit");
      return alert("Please complete the fields with valid data");
    }
     const formCompleto = {
      name: input.name,
      weight: input.wMin + " - " + input.wMax,
      height: input.hMin + " - " + input.hMax,
      life_span: input.life_spanMin + " - " + input.life_spanMax,
      image: input.image,
      temperament: input.temperament,
    };
    e.preventDefault();
    dispatch(postDogs(formCompleto));
    alert("Your dog has been created successfully");
    setInput({
      name: "",
      wMin: "",
      wMax: "",
      hMin: "",
      hMax: "",
      life_spanMin: "",
      life_spanMax: "",
      image: "",
      temperament: [],
    });
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's create something new!</h1>
      <div className={styles.todo}>
        <form
          id="NoSubmit"
          onSubmit={(e) => handleSubmit(e)}
          className={styles.form}>

          {/* ----------- NAME ----------- */}
          <div className={styles.contN}>
            {/* <label>Name:</label> */}
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Name..."
              className={styles.name}
              autoComplete="off"
            />
            {errors.name && <p className={styles.nameP}>{errors.name}</p>}
          </div>

          {/* ----------- WEIGTH ----------- */}
          <div className={styles.contW}>
            {/* <label>Weight:</label> */}
            <input
              type="number"
              value={input.wMin}
              name="wMin"
              onChange={(e) => handleChange(e)}
              placeholder="Min weight (Kg)"
              className={styles.wMin}
            />
            <input
              type="number"
              value={input.wMax}
              name="wMax"
              onChange={(e) => handleChange(e)}
              placeholder="Max weight (Kg)"
              className={styles.wMax}
            />
            {errors.wMin && <p className={styles.wMinP}>{errors.wMin}</p>}
            {errors.wMax && <p className={styles.wMaxP}>{errors.wMax}</p>}
          </div>

          {/* ----------- HEIGHT ----------- */}
          <div className={styles.contH}>
            {/* <label>Height:</label> */}
            <input
              type="number"
              value={input.hMin}
              name="hMin"
              onChange={(e) => handleChange(e)}
              placeholder="Min height (Cm)"
              className={styles.hMax}
            />
            <input
              type="number"
              value={input.hMax}
              name="hMax"
              onChange={(e) => handleChange(e)}
              placeholder="Max height (Cm)"
              className={styles.hMax}
            />
            {errors.hMin && <p className={styles.hMinP}>{errors.hMin}</p>}
            {errors.hMax && <p className={styles.hMaxP}>{errors.hMax}</p>}
          </div>

          {/* ----------- LIFE_SPAN ----------- */}
          <div className={styles.contL}>
            {/* <label>Life span:</label> */}
            <input
              type="number"
              value={input.life_spanMin}
              name="life_spanMin"
              onChange={(e) => handleChange(e)}
              placeholder="Min life span"
              className={styles.lsMin}
            />
            <input
              type="number"
              value={input.life_spanMax}
              name="life_spanMax"
              onChange={(e) => handleChange(e)}
              placeholder="Max life span"
              className={styles.lsMax}
            />
            {errors.life_spanMin && (
              <p className={styles.life_spanMinP}>{errors.life_spanMin}</p>
            )}
            {errors.life_spanMax && (
              <p className={styles.life_spanMaxP}>{errors.life_spanMax}</p>
            )}
          </div>

          <div className={styles.contI}>
            {/* <label>Image:</label> */}
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
              placeholder="Image url..."
              className={styles.image}
            />
            {errors.image && <p className={styles.imageP}>{errors.image}</p>}
          </div>

          <div className={styles.contT}>
            <select
              name="temperament"
              onChange={(e) => handleSelect(e)}
              value={input.temperament[input.temperament.length - 1]} //Cuando la persona selecciona un input, siempre se agrega al ultimo lugar del array, y yo le asigno el valor del largo delarray menos 1, de esa manera puedo luego identificarlos numericamente. 
              className={styles.select}
              // required
            >
              <option value="">Temperaments:</option>
              
              {temperaments.map((e) => (
                <option key={e.id} value={e.id}>
                  
                  {e.name}

                </option>
              ))}
            </select>
            <div>
              {[
                input.temperament.map(
                  (el) => temperaments.find((e) => e.id === el)?.name + ", "
                ),
              ]}
            </div>
            {/* The selected value is the last item in the array. I am converting the selected value into a NUMBER. When you select an item value returned is a string. You need to convert that to a number if you are using number. temperament: [...input.temperament, +e.target.value]. Adding + will convert a string to number. */}
            <div className={styles.delete}>
              {[
                input.temperament.map((e) => (
                  <div className={styles.options}>
                    <p key={e.id} className={styles.temperamentt}>
                      {temperaments.find((t) => t.id === e)?.name}
                    </p>
                    <button
                      onClick={() => handleDelete(e)}
                      className={styles.btnX}
                    >
                      X
                    </button>
                  </div>
                )),
              ]}
            </div>
          </div>
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Create
            </button>
          </div>
        </form>
        <div className={styles.contImg}>
          <img className={styles.img} src={dog} alt="Landing img not found" />
        </div>
      </div>
      <Link to="/home" className={styles.btn_container}>
        <button className={styles.back_btn}> Go home</button>
      </Link>
    </div>
  );
}


