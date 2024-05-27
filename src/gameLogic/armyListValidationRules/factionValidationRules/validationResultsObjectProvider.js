/**
 * The result of an army list validation is returned with this object:
 * - unitsBlockedbyRules: units that cannot be selected for any given reason are added to the array.
 *
 * - subFactionBelowMinimum: vertain sub faction have minimum points requirement.
 *   If not enough points are spent on units of that sub faction, it is added to the array.
 *
 * - removeUnitsNoLongerValid: some units can only be added to an army list when a condition
 *   is met.
 *   If the condition is no longer met, they are added to the array to be removed.
 *
 * - secondSubFactionMissing: if the faction has a rule that some/all units must be assigned
 *   a secod subFaction, units w/o it are added to thsi array
 * - commanderIsPresent: Most army construction rules demand the present of a commander.
 */
const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  removeUnitsNoLongerValid: [],
  secondSubFactionMissing: [],
  commanderIsPresent: false,
  alliedUnitsBlockedbyRules: [],
};

export default validationResults;
