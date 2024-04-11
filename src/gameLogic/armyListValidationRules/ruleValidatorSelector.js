import { DarkElveRules } from "./factionValidationRules/darkElves";
import { DwarfRules } from "./factionValidationRules/dwarfs";
import { ElfRules } from "./factionValidationRules/highElfsRules";
import { EmpireRules } from "./factionValidationRules/empireRules";
import { GoblinRules } from "./factionValidationRules/goblinRules";
import { IshtakRules } from "./factionValidationRules/ishtakRules";
import { OrkRules } from "./factionValidationRules/orkRules";
import { NorwingerRules } from "./factionValidationRules/norwingerRules";
import { UndeadRules } from "./factionValidationRules/undeadRules";
import { ThainRules } from "./factionValidationRules/thainRules";
import { LizardMenRules } from "./factionValidationRules/lizardmenRules";
import { SouthernCityStatesRules } from "./factionValidationRules/southernCityStatesRules";

/**
 * Logic and abstraction layer for validating army lists. Returns a validator object with a testSubFactionRules function that differs for every faction.
 * @param {String} faction
 * @returns the validator object for the selected faction.
 */
export const ruleValidation = (faction) => {
  switch (faction) {
    case "Dunkelelfen":
      return DarkElveRules;
    case "Elfen":
      return ElfRules;
    case "Goblins":
      return GoblinRules;
    case "Imperium":
      return EmpireRules;
    case "Ishtak":
      return IshtakRules;
    case "Norwinger":
      return NorwingerRules;
    case "Orks":
      return OrkRules;
    case "Thain":
      return ThainRules;
    case "Untote":
      return UndeadRules;
    case "Zwerge":
      return DwarfRules;
    case "Echsenmenschen":
      return LizardMenRules;
    case "Südliche Stadtstaaten":
      return SouthernCityStatesRules;
    default:
      throw new Error("ruleValidationSelector could not find validator for supplied faction.");
  }
};
