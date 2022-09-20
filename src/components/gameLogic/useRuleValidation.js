// import React, { useState } from "react";
// components and functions
import { DarkElfRules } from "./darkElves";
import { DwarfRules } from "./dwarfs";
import { ElfRules } from "./highElfsRules";
import { EmpireRules } from "./empireRules";
import { GoblinRules } from "./goblinRules";
import { IshtakRules } from "./ishtakRules";
import { OrkRules } from "./orkRules";
import { NorwingerRules } from "./norwingerRules";
import { UndeadRules } from "./undeadRules";
import { ThainRules } from "./thainRules";

// abstraction layer

// TODO: let this serve as the abstraction layer. When a unit selection needs validation, call this! in here, hide /encapsulate the logic for choosing
// the right valkidation  logic and returning the reesult of the validation

/**
 * TODO
 *  - call this once when a faction is selected. return a validator.
 *  - a validator is a function. it takes in the complete list and hands out an object : which subfaction(s) violate the restraints set by the game
 *    and an array of error messages
 *  - IN ADDITION you need a generic second validator that runs and checks that no unit has been selected more than twice. This validator can be turned
 *    off!
 *  - A third validator checks total points > point total
 *
 *
 */

export const ruleValidation = (faction) => {
  switch (faction) {
    case "Delfen":
      return DarkElfRules;
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
    default:
      // there is no default case.
      break;
  }
};
