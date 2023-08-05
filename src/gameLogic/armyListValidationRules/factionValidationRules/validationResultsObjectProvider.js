/**
 * The result of an army list validation is returned with this object:
 * - unitsBlockedbyRules: units that cannot be selected for any given reason are added to the array.
 *
 * - subFactionBelowMinimum: vertain sub faction have minimum points requirement.
 *   If not enough points are spent on units of that sub faction, it is added to the array.
 *
 * - removeUnitsNoLongerValid: some units can only be added to an army list when a condition is met.
 *   If the condition is no longer met, they are added to the array to be removed.
 *
 * - commanderIsPresent: Most army construction rules demand the present of a commander.
 */
const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  removeUnitsNoLongerValid: [],
  commanderIsPresent: false,
};

export default validationResults;
