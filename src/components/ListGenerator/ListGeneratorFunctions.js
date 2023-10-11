
/**
 * Function filters unit card arrays for a sub faction.
 * @param {String} subFaction
 * @returns An array of unit card objects filtered for a a sub faction.
 */
export const filterForSubFaction = (units, subFaction) => {
  return units.filter((u) => u.subFaction === subFaction);
};
