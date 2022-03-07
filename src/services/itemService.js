import axios from "axios";

/**
 * Returns all item cards in the game.
 */
export const getAllItems = () => {
  response = {};

  axios
    .get(`http://localhost:8080/items`)
    .then((data) => {
      response = { ...response, data };
      //    TODO test response
    })
    // TODO  proper error handling!
    .catch((error) => console.log(error));

  return response;
};

/**
 * Returns all item cards in the game.
 */
export const getAllItems = (faction) => {
  response = {};

  axios
    .get(`http://localhost:8080/items/${faction}`)
    .then((data) => {
      response = { ...response, data };
      //    TODO test response
    })
    // TODO  proper error handling!
    .catch((error) => console.log(error));

  return response;
};

/**
 * Returns all item cards in the game.
 */
export const getAllItems = (unitType) => {
  response = {};

  axios
    .get(`http://localhost:8080/items/${unitType}`)
    .then((data) => {
      response = { ...response, data };
      //    TODO test response
    })
    // TODO  proper error handling!
    .catch((error) => console.log(error));

  return response;
};

/**
 * Returns all item cards in the game.
 */
export const getAllItems = (faction, unitType) => {
  response = {};

  axios
    .get(`http://localhost:8080/items/${faction}/${unitType}`)
    .then((data) => {
      response = { ...response, data };
      //    TODO test response
    })
    // TODO  proper error handling!
    .catch((error) => console.log(error));

  return response;
};
