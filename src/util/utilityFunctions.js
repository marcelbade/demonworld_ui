/**
 * Function checks if a subFaction is an alternative sub faction.
 * If true, it is only displayed if the flag  selectedAlternativeOptionis set to true too.
 * @param {subFaction dto} subfactionDataObject
 * @returns
 */
export const isSubFactionAlternativeAndSelective = (subfactionDataObject) => {
  if (subfactionDataObject.alternativeListOption) {
    return subfactionDataObject.selectedAlternativeOption;
  }
  return true;
};
