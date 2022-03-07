import axios from "axios";

/**
 * Returns all unit cards in the game.
 */
export const getAllFactions = async (populateData) => {
  const response = await axios.get(`http://localhost:8080/factions`);
  return response.data;
};

 

/**
 * Returns all units for the given faction.
 * @param {*} faction
 */
export const getSingleFaction = (faction) => {
  let response = {};

  axios
    .get(`http://localhost:8080/faction/${faction}`)
    .then((data) => {
      response = { ...response, data };
    })
    // TODO  proper error handling!
    .catch((error) => console.log(error));

  return response;
};
