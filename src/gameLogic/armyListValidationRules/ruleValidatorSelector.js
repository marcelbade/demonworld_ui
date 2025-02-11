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
// text
import {
  DARKELF_TEXTS,
  DWARF_TEXTS,
  ELF_TEXTS,
  EMPIRE_TEXTS,
  GOBLIN_TEXTS,
  ISHTAK_TEXTS,
  LIZARDMEN_TEXTS,
  NORWINGER_TEXTS,
  ORKS_TEXTS,
  SOUTHERN_CITY_STATES_TEXTS,
  THAIN_TEXTS,
  UNDEAD_TEXTS,
} from "../../constants/textsAndMessages";

/**
 * Logic and abstraction layer for validating army lists. 
 * Returns a validator object with a testSubFactionRules 
 * function that differs for every faction.
 * @param {String} faction
 * @returns the validator object for the selected faction.
 */
export const ruleValidation = (faction) => {
  switch (faction) {
    case DARKELF_TEXTS.FACTION_NAME:  
      return DarkElveRules;
    case DWARF_TEXTS.FACTION_NAME:
      return DwarfRules;
    case ELF_TEXTS.FACTION_NAME:
      return ElfRules;
    case EMPIRE_TEXTS.FACTION_NAME:
      return EmpireRules;
    case GOBLIN_TEXTS.FACTION_NAME:
      return GoblinRules;
    case ISHTAK_TEXTS.FACTION_NAME:
      return IshtakRules;
    case LIZARDMEN_TEXTS.FACTION_NAME:
      return LizardMenRules;
    case NORWINGER_TEXTS.FACTION_NAME:
      return NorwingerRules;
    case ORKS_TEXTS.FACTION_NAME:
      return OrkRules;
    case SOUTHERN_CITY_STATES_TEXTS.FACTION_NAME:
      return SouthernCityStatesRules;
    case THAIN_TEXTS.FACTION_NAME:
      return ThainRules;
    case UNDEAD_TEXTS.FACTION_NAME:
      return UndeadRules;
    default:
      throw new Error("ruleValidationSelector could not find validator for supplied faction.");
  }
};
