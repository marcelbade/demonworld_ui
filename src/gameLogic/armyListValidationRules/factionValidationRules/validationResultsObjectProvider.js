/**
 * The result of an army list validation is returned with this object:
 * - unitsBlockedbyRules: units that cannot be selected for any given reason are added to the array.
 *
 * - invalidSubFactions: sub factions must be deemed invalid if one of two conditions is true:
 *    - certain sub faction have minimum points requirement. If not enough points are spent on
 *      units of that sub faction, it is added to the array.
 *    - most armies need an army commande5r (hero unit with a commandstar value >= 2). If one
 *      is missing, all sub factions that contain one or more units that eligible
 *      must be added.
 * - removeUnitsNoLongerValid: some units can only be added to an army list when a condition
 *   is met.
 *   If the condition is no longer met, they are added to the array to be removed.
 *
 * - secondSubFactionMissing: if the faction has a rule that some/all units must be assigned
 *   a secod subFaction, units w/o it are added to thsi array
 *
 */
const validationResults = {
  unitsBlockedbyRules: [],
  invalidSubFactions: [],
  removeUnitsNoLongerValid: [],
  secondSubFactionMissing: [],
  alliedUnitsBlockedbyRules: [],
};

export default validationResults;
