/*
 *  additional rules:
 * - sturmlords, hexen, helden,... -> max. 50%
 * - for every Neanders unit ->  one other human unit...
 * - todo: SQL: Jäger des Nordens is unique!!!
 * - giant yeti -> at least one unit yeti!
 * */


// TODO: correct subfations, percentages


export const pointAllowances = [
    {
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
  