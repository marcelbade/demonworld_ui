
/**
 * Function filters unit card arrays for a sub faction.
 * @param {String} subFaction
 * @returns An array of unit card objects filtered for a a sub faction.
 */
export const filterForSubFaction = (units, subFaction) => {
  return units.filter((u) => u.subFaction === subFaction);
};

/**
 * Function returns all distinct subFactions of a selected faction.
 * @param {[unitCard object]} units
 * @returns [String] name of all distinct subFactions
 */
export const findDistinctSubfactions = (units) => {
  let distinctSubFactions = [];

  units.forEach((f) => {
    if (!distinctSubFactions.includes(f.subFaction)) {
      distinctSubFactions.push(f.subFaction);
    }
  });

  return distinctSubFactions;
};

 