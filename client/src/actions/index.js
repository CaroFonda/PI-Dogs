import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs", {});
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}

export function filterByTemp(payload) {
  return {
    type: "FILTER_BY_TEMP",
    payload,
  };
}

export function getBreedName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispatch({
        type: "GET_BREED_NAME",
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/temperament", {});
    return dispatch({ type: "GET_TEMPERAMENTS", payload: info.data });
  };
}

export function postDogs(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/dog", payload);
    return response;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

