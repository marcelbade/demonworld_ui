/**
 * Function tests whether the spelltier propety is a text or not.
 * @param {String} tier
 * @returns true, if the spell tier is a text/description.
 */
export const spellTierIsText = (tier) => {
  return /.*[a-zA-Z].*/.test(tier);
};

// if no spell is selected, or a new faction is selectedi  the drop down, show this as the default:
export const NO_SELECTION = {
  faction: "", //
  spellName: "-",
  effect: "-",
  duration: "-",
  requirements: "-",
  target: "-",
  spellTier: "-",
};
