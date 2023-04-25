import axios from "axios";

/**
 * Returns all item cards in the game.
 */
export const getAllItems = async () => {
  const response = await axios(`http://localhost:8080/items`);
  return response.data;
};

/**
 * Returns all item cards for a faction.
 */
export const getfactionItems = (faction) => {
  let response = {};

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
 * Returns all item cards for a unit type.
 */
export const getUnitTypeItems = (unitType) => {
  let response = {};

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
 * Returns all item cards fora unit type and a faction.
 */
export const getItemsForUnitTypeAndFaction = (faction, unitType) => {
  let response = {};

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
