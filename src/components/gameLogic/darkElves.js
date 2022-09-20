const rules = [
  {
    subFaction: "warriorCaste",
    cardNames: ["Kriegerkaste"],
    total: 0,
    min: 0.3,
    max: 1.0,
    error: "Deine Armeeliste muss zu mindestens 30% aus Einheiten der Kriegerkaste bestehen.",
  },
  {
    subFaction: "nobleCaste",
    cardNames: ["Adelskaste"],
    total: 0,
    min: 0.0,
    max: 0.5,
    error: "Deine Armee darf höchstens zu 50% aus Einheiten der Adelskaste bestehen.",
  },
  {
    subFaction: "magicianCaste",
    cardNames: ["Magierkaste"],
    total: 0,
    min: 0.0,
    max: 0.4,
    error: "Deine Armee darf höchstens zu 40% aus Einheiten der Magierkaste bestehen.",
  },
  {
    subFaction: "priestCaste",
    cardNames: ["Priesterkaste"],
    total: 0,
    min: 0.0,
    max: 0.4,
    error: "Deine Armee darf höchstens zu 40% aus Einheiten der Priesterkaste bestehen.",
  },
  {
    subFaction: "heroes",
    cardNames: ["Befehlshaber", "Held"],
    total: 0,
    min: 0.0,
    max: 0.4,
    error: "Deine Armee darf höchstens zu 40% aus Helden oder Befehlshabern bestehen.",
  },
  {
    subFaction: "heroesMagiciansPriestsTotal",
    cardNames: ["Magier", "Priesterin", "Befehlshaber", "Held"],
    total: 0,
    min: 0.0,
    max: 0.5,
    error: "Deine Armee darf höchstens zur Hälfte aus Magiern, Priestern, Helden, o. Befehlshabern bestehen",
  },
];

export const DarkElfRules = {
  testSubFactionRules: (subFactionName, subFactionsPoints,  netArmyPoints) => {

    let notValid = [];
    let error = [];

  let rule =  rules.filter((subFaction) => subFaction.cardNames.includes(subFactionName));
    
  if(rule.min * netArmyPoints )


    // selectedUnits.forEach((unit) => {});

    return { Failed: notValid, errorMessage: error };
  },
};
