/**
   Object contains 
   - the point allowances for every subfaction
   - some subfaction count again the same limit.
   - wether they are minimums or maximums
 */

//TODO: correct this :)

//    Tiermenschen 10% – 60%
//    Menschen    10% – 60%
//    Eishexen  10% – 60%
//    Dämonen   höchstens 50%
//    Untote     höchstens 50%
//    Eisriesen   höchstens 30%

export const IshtakRules = [
  {
    // TODO: braucht man das hier??? Prüf mal bitte
    names: ["Befehlshaber", "Held"],
    min: 0.1,
    max: 0.1,
    special: "",
  },

  {
    names: ["Menschen"],
    min: 0.1,
    max: 0.6,
    special: "",
  },
  {
    names: ["Tiermenschen"],
    min: 0.1,
    max: 0.6,
    special: "",
  },
  {
    names: ["Eishexen"],
    min: 0.1,
    max: 0.6,
    special: "",
  },
  {
    names: ["Dämonen"],
    min: 0.0,
    max: 0.5,
    special: "",
  },
  {
    names: ["Untote"],
    min: 0.0,
    max: 0.5,
    special: "",
  },
  {
    names: ["Eisriesen"],
    min: 0.0,
    max: 0.3,
    special: "",
  },
];
