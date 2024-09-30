// react
import React, { useState } from "react";
// material ui
import { Grid } from "@mui/material";
import NameCreator from "./NameCreator";
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
import UnitAttributeCreator from "./UnitAttributeCreator";
import UnitTypeSelector from "./UnitTypeSelector";

import AppBar from "../shared/AppBar";
import CardPreview from "./CardPreview";
import MenuSwitch from "../shared/MenuSwitch";
//  contexts
import CardCreationProvider from "../../contexts/cardCreationContext";
// constants
import { ID } from "../../constants/appBarConstants";
import { UNIT } from "../../constants/unitTypes";

const CardCreator = () => {
  // faction name + subfaction name
  const [newFaction, setNewFaction] = useState(false);
  const [factionName, setFactionName] = useState("");
  const [subFactionName, setSubFactionName] = useState(" ");
  // unit type
  const [unitType, setUnitType] = useState(UNIT);
  // name
  const [unitName, setUnitName] = useState("");
  // unit attribbutes
  const [commandStars, setCommandStars] = useState(0);
  const [magic, setMagic] = useState(0);
  const [isunique, setIsunique] = useState(false);
  const [isCavalery, setIsCavalery] = useState(false);
  const [hasShield, setHasShield] = useState(false);
  const [closedFormation, setClosedFormation] = useState(false);
  const [leaderClosedFormation, setLeaderClosedFormation] = useState(false);
  const [isLowFlyer, setIsLowFlyer] = useState(false);
  const [isHighFlyer, setIsHighFlyer] = useState(false);
  const [hasMaxFieldsMove, setHasMaxFieldsMove] = useState(false);
  // movement
  const [move, setMove] = useState(0);
  const [skirmish, setSkirmish] = useState(0);
  const [charge, setCharge] = useState(0);
  const [maneuver, setManeuver] = useState(0);
  // melee weapons
  const [meleeWeaponName1, setMeleeWeaponName1] = useState("");
  const [meleeValue1, setMeleeValue1] = useState(0);
  const [meleeWeaponName2, setMeleeWeaponName2] = useState("");
  const [meleeValue2, setMeleeValue2] = useState(0);
  const [meleeWeaponName3, setMeleeWeaponName3] = useState("");
  const [meleeValue3, setMeleeValue3] = useState(0);
  const [hasMeleeSkill, setHasMeleeSkill] = useState(false);
  const [meleeSkill, setMeleeSkill] = useState(0);
  const [chargeBonus, setChargeBonus] = useState("");
  const [lineNumber, setLineNumber] = useState(1);
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
  const [hitpoints, setHitpoints] = useState("");
  const [initiative, setInitiative] = useState("");
  // size and armor
  const [size, setSize] = useState(2);
  const [rangeArmor, setRangeArmor] = useState(0);
  const [meleeArmor, setMeleeArmor] = useState(0);
  // fear and moral
  const [fear, setFear] = useState(0);
  const [moral1, setMoral1] = useState(0);
  const [moral2, setMoral2] = useState(0);
  // number of elements and special elements
  const [numberOfElements, setNumberOfElements] = useState(10);
  const [leader, setLeader] = useState(false);
  const [banner, setBanner] = useState(false);
  const [musician, setMusician] = useState(false);
  // points
  const [pointCost, setPointCost] = useState(0);
  // special rules
  const [specialRule, setSpecialRule] = useState("");

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
        // unittype
        unitType: unitType,
        setUnitType: setUnitType,
        // name
        unitName: unitName,
        setUnitName: setUnitName,
        // unit attributes
        commandStars: commandStars,
        magic: magic,
        isunique: isunique,
        isCavalery: isCavalery,
        hasShield: hasShield,
        closedFormation: closedFormation,
        leaderClosedFormation: leaderClosedFormation,
        isLowFlyer: isLowFlyer,
        isHighFlyer: isHighFlyer,
        hasMaxFieldsMove: hasMaxFieldsMove,
        setHasMaxFieldsMove: setHasMaxFieldsMove,

        setMagic: setMagic,
        setCommandStars: setCommandStars,
        setLeaderClosedFormation: setLeaderClosedFormation,
        setIsunique: setIsunique,
        setIsCavalery: setIsCavalery,
        setHasShield: setHasShield,
        setClosedFormation: setClosedFormation,
        setIsLowFlyer: setIsLowFlyer,
        setIsHighFlyer: setIsHighFlyer,
        // movment
        move: move,
        charge: charge,
        skirmish: skirmish,
        maneuver: maneuver,
        setSkirmish: setSkirmish,
        setMove: setMove,
        setCharge: setCharge,
        setManeuver: setManeuver,
        // formations
        wedge: wedge,
        skirmishFormation: skirmishFormation,
        square: square,
        horde: horde,
        setWedge: setWedge,
        setSkirmishFormation: setSkirmishFormation,
        setSquare: setSquare,
        setHorde: setHorde,
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
        //  intiative
        initiative: initiative,
        //  melee
        meleeWeaponName1: meleeWeaponName1,
        meleeValue1: meleeValue1,
        meleeWeaponName2: meleeWeaponName2,
        meleeValue2: meleeValue2,
        meleeWeaponName3: meleeWeaponName3,
        meleeValue3: meleeValue3,
        hasMeleeSkill: hasMeleeSkill,
        meleeSkill: meleeSkill,
        chargeBonus: chargeBonus,
        lineNumber: lineNumber,
        setMeleeWeaponName1: setMeleeWeaponName1,
        setMeleeValue1: setMeleeValue1,
        setMeleeWeaponName2: setMeleeWeaponName2,
        setMeleeValue2: setMeleeValue2,
        setMeleeWeaponName3: setMeleeWeaponName3,
        setMeleeValue3: setMeleeValue3,
        setHasMeleeSkill: setHasMeleeSkill,
        setMeleeSkill: setMeleeSkill,
        setChargeBonus: setChargeBonus,
        setLineNumber: setLineNumber,
        //  size & armor
        size: size,
        rangeArmor: rangeArmor,
        meleeArmor: meleeArmor,
        setRangeArmor: setRangeArmor,
        setMeleeArmor: setMeleeArmor,
        setSize,
        // fear & moral
        fear: fear,
        moral1: moral1,
        moral2: moral2,
        setFear: setFear,
        setMoral2: setMoral2,
        setMoral1: setMoral1,
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
      <Grid container direction="row">
        <AppBar hiddenElements={[ID.COMPENDIMUM_DROPDOWN, ID.LIST_DISPLAY]} />
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "100%",
            width: "50%",
            marginLeft: "3em",
          
          }}
        >
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
              <UnitTypeSelector />
              <SpecialElementsCreator />
              <UnitAttributeCreator />
              <UnitMovementCreator />
              <RangeWeaponCreator />
              <MeleeWeaponCreator />
              <SizeAndSkillCreator />
              <FearAndMoralCreator />
              <HitpointCreator />
              <SpecialRuleCreator />
              <PointCostCreator />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="column"
          sx={{
            width: "35%",
            paddingTop: "4em",
          }}
        >
          <CardPreview />
        </Grid>
      </Grid>
    </CardCreationProvider>
  );
};

export default CardCreator;
