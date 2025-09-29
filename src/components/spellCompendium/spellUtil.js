  /**
   * Function tests whether the spelltier propety is a text or not.
   * @param {String} tier
   * @returns true, if the spell tier is a text/description.
   */
  export const  spellTierIsText = (tier) => {
    return /.*[a-zA-Z].*/.test(tier);
  };
