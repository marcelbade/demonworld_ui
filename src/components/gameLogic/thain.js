/*
 * additional rule
 * - EVERY UNIT, ARTILLERY PIECE, CHAMPION,... WITH THE EXCEPTION OF DORGAPRIESTS, CHURCH UNITS AND GARYDWEN MUST BE ASSIGNED TO A TRIBE
 *  - tribal champions can only be selected when at least ONE unit of the tribe has been selected
 *  - for every veteran unit of a tribe you need ONE tribal unit
 *  - Dorga priests can only be selected if at least ONE church unit has been selected
 *  - in addition to the maximum for shamans and heroes/champions the points for champions/heroes AND shamans must be <= 50
 *  - for every FULL 10% of shamans, the maximum for church/droga units is lowered by 10%
 *    * e.g. 25% shamans -> -20% for church units
 *
 * */


// TODO: correct subfations for thain, percentages

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
  