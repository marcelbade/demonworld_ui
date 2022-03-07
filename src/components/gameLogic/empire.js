
/**
 * additional rules for the empire
 * <p>
 * - only one border mark!
 * - one ** commander
 * TODO: the border mark must be picked in the frontend. is stored in the resultContainer
 */

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
  