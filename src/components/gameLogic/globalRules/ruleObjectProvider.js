import { rules as DarkElveRulesList } from "../factionValidationRules/darkElves";
import { rules as DwarfRulesList } from "../factionValidationRules/dwarfs";
import { rules as ElvenRulesList } from "../factionValidationRules/highElfsRules";
import { rules as EmpireRulesList } from "../factionValidationRules/empireRules";
import { rules as GoblinRulesList } from "../factionValidationRules/goblinRules";
import { rules as IshtakRulesList } from "../factionValidationRules/ishtakRules";
import { rules as OrkRulesList } from "../factionValidationRules/orkRules";
import { rules as NorwingerRulesList } from "../factionValidationRules/norwingerRules";
import { rules as UndeadRulesList } from "../factionValidationRules/undeadRules";
import { rules as ThainRulesList } from "../factionValidationRules/thainRules";

export const ruleObjectProvider = (faction) => {
  switch (faction) {
    case "Dunkelelfen":
      return DarkElveRulesList;
    case "Elfen":
      return ElvenRulesList;
    case "Goblins":
      return GoblinRulesList;
    case "Imperium":
      return EmpireRulesList;
    case "Ishtak":
      return IshtakRulesList;
    case "Norwinger":
      return NorwingerRulesList;
    case "Orks":
      return OrkRulesList;
    case "Thain":
      return ThainRulesList;
    case "Untote":
      return UndeadRulesList;
    case "Zwerge":
      return DwarfRulesList;
    default:
      // there is no default case.
      break;
  }
};
