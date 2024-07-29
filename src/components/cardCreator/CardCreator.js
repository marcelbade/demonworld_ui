// react
import React, { useState } from "react";
// material ui
import { Grid } from "@mui/material";
import NameCreator from "./NameCreator";
// components and functions
import UnitMovementCreator from "./UnitMovementCreator";
import RangeWeaponCreator from "./RangeWeaponCreator";
import MeleeWeaponCreator from "./MeleeWeaponCreator";
import SizeAndSkillCreator from "./SizeAndSkillCreator";
import HitpointCreator from "./HitpointCreator";
import SpecialElementsCreator from "./SpecialElementsCreator";
import SpecialRuleCreator from "./SpecialRuleCreator";
import PointCostCreator from "./PointCostCreator";
import FearAndMoralCreator from "./FearAndMoralCreator";
import FactionNameCreator from "./FactionNameCreator";
import FormationsAndHordeCreator from "./FormationsAndHordeCreator";
import AppBar from "../shared/AppBar";
// constants
import { ID } from "../../constants/appBarConstants";
import MenuSwitch from "../shared/MenuSwitch";
import CardCreationProvider from "../../contexts/cardCreationContext";

const CardCreator = () => {
  // faction name + subfaction name
  const [newFaction, setNewFaction] = useState(false);
  const [factionName, setFactionName] = useState("");
  const [subFactionName, setSubFactionName] = useState("");
  // name
  const [unitName, setUnitName] = useState("");
  // melee weapons
  const [meleeWeaponName, setMeleeWeaponName] = useState("");
  const [meleeValue, setMeleeValue] = useState("");
  const [hasMeleeSkill, setHasMeleeSkill] = useState(false);
  const [meleeSkill, setMeleeSkill] = useState(0);
  const [lineNumber, setLineNumber] = useState(1);
  // charge bonus
  const [chargeBonus, setChargeBonus] = useState("");
  // fear and moral
  const [fear, setFear] = useState("");
  const [moral1, setMoral1] = useState("");
  const [moral2, setMoral2] = useState("");
  //  formations and horde
  const [wedge, setWedge] = useState(false);
  const [skirmishFormation, setSkirmishFormation] = useState(false);
  const [square, setSquare] = useState(false);
  const [horde, setHorde] = useState(false);
  // rangedWeapon
  const [hasRangedWeapon, setHasRangedWeapon] = useState(true);
  const [rangedWeaponName, setRangedWeaponName] = useState("");
  const [rangedAttackStats, setRangedAttackStats] = useState("");
  const [hasRangedSkill, setHasRangedSkill] = useState(false);
  const [rangeSkill, setRangeSkill] = useState(0);
  //meleeWeapon
  //
  const [hitpoints, setHitpoints] = useState("");
  const [initiative, setInitiative] = useState("");
  const [maneuver, setManeuver] = useState("");
  //

  //
  const [pointCost, setPointCost] = useState("");
  //
  const [size, setSize] = useState("");
  const [rangeArmor, setRangeArmor] = useState(0);
  const [meleeArmor, setMeleeArmor] = useState(0);

  // number of elements and special elements

  const [numberOfElements, setNumberOfElements] = useState(10);
  const [leader, setLeader] = useState(true);
  const [banner, setBanner] = useState(false);
  const [musician, setMusician] = useState(false);
  //
  const [specialRule, setSpecialRule] = useState("");
  //
  const [move, setMove] = useState("");
  const [skirmish, setSkirmish] = useState("");
  const [charge, setCharge] = useState("");

  return (
    <CardCreationProvider
      value={{
        //  faction
        newFaction: newFaction,
        factionName: factionName,
        subFactionName: subFactionName,
        setNewFaction: setNewFaction,
        setSubFactionName: setSubFactionName,
        setFactionName: setFactionName,
        // name
        unitName: unitName,
        setUnitName: setUnitName,
        // movment
        move: move,
        charge: charge,
        skirmish: skirmish,
        maneuver: maneuver,
        setSkirmish: setSkirmish,
        setMove: setMove,
        setCharge: setCharge,
        setManeuver: setManeuver,
        // range
        hasRangedWeapon: hasRangedWeapon,
        rangedWeaponName: rangedWeaponName,
        rangedAttackStats: rangedAttackStats,
        hasRangedSkill: hasRangedSkill,
        rangeSkill: rangeSkill,
        setRangedWeaponName: setRangedWeaponName,
        setRangedAttackStats: setRangedAttackStats,
        setHasRangedSkill: setHasRangedSkill,
        setHasRangedWeapon: setHasRangedWeapon,
        setRangeSkill: setRangeSkill,
        //  melee
        meleeWeaponName: meleeWeaponName,
        meleeValue: meleeValue,
        hasMeleeSkill: hasMeleeSkill,
        meleeSkill: meleeSkill,
        chargeBonus: chargeBonus,
        lineNumber: lineNumber,
        setMeleeWeaponName: setMeleeWeaponName,
        setMeleeValue: setMeleeValue,
        setHasMeleeSkill: setHasMeleeSkill,
        setMeleeSkill: setMeleeSkill,
        setChargeBonus: setChargeBonus,
        setLineNumber: setLineNumber,
        // fear & moral
        fear: fear,
        moral1: moral1,
        moral2: moral2,
        setFear: setFear,
        setMoral2: setMoral2,
        setMoral1: setMoral1,
        // formations
        wedge: wedge,
        skirmishFormation: skirmishFormation,
        square: square,
        horde: horde,
        setWedge: setWedge,
        setSkirmishFormation: setSkirmishFormation,
        setSquare: setSquare,
        setHorde: setHorde,
        // special elements
        leader: leader,
        banner: banner,
        musician: musician,
        numberOfElements: numberOfElements,
        setLeader: setLeader,
        setBanner: setBanner,
        setMusician: setMusician,
        setNumberOfElements: setNumberOfElements,
        // hitpoints
        hitpoints: hitpoints,
        //  intiative
        initiative: initiative,
        //  size & armor
        size: size,
        rangeArmor: rangeArmor,
        meleeArmor: meleeArmor,
        setRangeArmor: setRangeArmor,
        setMeleeArmor: setMeleeArmor,
        setSize,
        // point cost
        pointCost: pointCost,
        setPointCost: setPointCost,
        // special rules
        specialRule: specialRule,
        setSpecialRule: setSpecialRule,

        setHitpoints: setHitpoints,
        setInitiative: setInitiative,
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "100%",
          width: "100%",
          marginLeft: "3em",
        }}
      >
        <AppBar hiddenElements={[ID.COMPENDIMUM_DROPDOWN, ID.LIST_DISPLAY]} />
        <Grid
          item
          container //
          alignItems="center"
          justifyContent="flex-start"
        >
          <MenuSwitch
            iconSize="25em" //
            bttnSize="2em"
            margin="0.5em"
          />
        </Grid>
        <Grid
          item //
          container
          direction="row"
        >
          <Grid
            item
            container //
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "max-content",
            }}
          >
            <FactionNameCreator />
            <NameCreator />
            <UnitMovementCreator />
            <FormationsAndHordeCreator />
            <RangeWeaponCreator />
            <MeleeWeaponCreator />
            <SizeAndSkillCreator />
            <FearAndMoralCreator />
            <HitpointCreator />
            <SpecialElementsCreator />
            <SpecialRuleCreator />
            <PointCostCreator />
          </Grid>
        </Grid>
      </Grid>
    </CardCreationProvider>
  );
};

export default CardCreator;
