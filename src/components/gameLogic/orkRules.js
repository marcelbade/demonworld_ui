/**
   Object contains 
   - the point allowances for every subfaction
   - some subfaction count again the same limit.
   - wether they are minimums or maximums
 */

/**
   * TODO: WYVERN -> count as item
   * TODO: LIMIT TO ONE CLAN
   * <p>
   * ok, orks is mildly annoying
   * you choose -> clan OR clangett
   * Clan: special troops of that one clan 50 percent
   * Clangett: lead by one of Clanngetts Lieutenants and troops of all clans can be picked, but at a lower max (20%)
   * ALSO:
   * The lieutenants are Trazzag,  Fherniak,  Ärrig,  Khazzar  and  Nallian
   * <p>
   * DONE
   * ======================
   * - check for clangett lt. method
   * - check if clangett or clan, make max numbers dependent on that choice
   * - limit to one clan , else FALSE
 **/ 


export const pointAllowances = [
    {
      // TODO: braucht man das hier??? Prüf mal bitte 
      names: ["Befehlshaber", "Held"],
      min: 0.10,
      max: 0.10,
      special: "",
    },
  
    {
      names: ["Menschen"],
      min: 0.10,
      max: 0.60,
      special: "",
    },
    {
      names: ["Tiermenschen"],
      min: 0.10,
      max: 0.60,
      special: "",
    },
    {
      names: ["Eishexen"],
      min: 0.10,
      max: 0.60,
      special: "",
    },
    {
      names: ["Dämonen"],
      min: 0.0,
      max: 0.50,
      special: "",
    },
    {
      names: ["Untote"],
      min: 0.0,
      max: 0.50,
      special: "",
    },
    {
      names: ["Eisriesen"],
      min: 0.0,
      max: 0.30,
      special: "",
    },
  ];
  