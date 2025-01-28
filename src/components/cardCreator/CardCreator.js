// react
import React, { useState } from "react";
// material ui
import { Box, Grid } from "@mui/material";

//
import FactionNameCreator from "./FactionNameCreator";
import FearAndMoralCreator from "./FearAndMoralCreator";
import HitpointCreator from "./HitpointCreator";
import MeleeWeaponCreator from "./MeleeWeaponCreator";
import NameCreator from "./NameCreator";
import PointCostCreator from "./PointCostCreator";
import RangeWeaponCreator from "./RangeWeaponCreator";
import SizeAndSkillCreator from "./SizeAndSkillCreator";
import SpecialElementsCreator from "./SpecialElementsCreator";
import SpecialRuleCreator from "./SpecialRuleCreator";
import UnitMovementCreator from "./UnitMovementCreator";
import UnitAttributeCreator from "./UnitAttributeCreator";
import UnitTypeSelector from "./UnitTypeSelector";

import AppBar from "../shared/AppBar";
import CardPreview from "./CardPreview";
import MenuSwitch from "../shared/MenuSwitch";
//  contexts
import CardCreationProvider from "../../contexts/cardCreationContext";
// constants
import { ID } from "../../constants/appBarConstants";

const CardCreator = () => {
  const [newFaction, setNewFaction] = useState(false);
  const [hasRangedWeapon, setHasRangedWeapon] = useState(false);
  const [hasRangedSkill, setHasRangedSkill] = useState(false);
  const [hasMeleeSkill, setHasMeleeSkill] = useState(false);
  const [isFearless, setIsFearless] = useState(false);
  const [neverImpetuous, setNeverImpetuous] = useState(false);

  const [unit, setUnit] = useState({
    faction: "",
    subFaction: "",
    unitName: "",
    move: 16,
    charge: 16,
    skirmish: 12,
    hold_maneuvers: 1,
    squareFormation: false,
    skirmishFormation: false,
    wedgeFormation: false,
    horde: false,
    skillRange: 0,
    rangedAttackStats: "",
    rangedWeapon: "x",
    initiative: 2,
    chargeBonus: 0,
    skillMelee: 0,
    weapon1Name: "Nahkampfangriff",
    weapon1: 10,
    weapon2Name: "",
    weapon2: 0,
    weapon3Name: "",
    weapon3: 0,
    unitSize: 2,
    armourRange: 1,
    armourMelee: 1,
    fear: 2,
    moral1: 4,
    moral2: 12,
    leader: false,
    standardBearer: false,
    musician: false,
    specialRules: "",
    numberOfElements: 10,
    hitpoints: 1,
    points: 170,
    secondSubFaction: "",
    hasShield: false,
    isHighFlyer: false,
    isLowFlyer: false,
    isMounted: false,
    isMultiStateUnit: false,
    unitIsClosedOrder: false,
    leaderIsClosedOrder: false,
    maxFieldsMove: false,
    multiCardName: "",
    multiStateOrderNumber: 0,
    belongsToUnit: "NONE",
    commandStars: 0,
    magic: 0,
    controlZone: 0,
    overRun: 0,
    uniqueUnit: false,
    unitType: "U",
  });

  return (
    <CardCreationProvider
      value={{
        unit: unit,
        setUnit: setUnit,
        //
        newFaction: newFaction,
        setNewFaction: setNewFaction,
        //
        hasRangedWeapon: hasRangedWeapon,
        setHasRangedWeapon: setHasRangedWeapon,
        //
        hasRangedSkill: hasRangedSkill,
        setHasRangedSkill: setHasRangedSkill,
        //
        hasMeleeSkill: hasMeleeSkill,
        setHasMeleeSkill: setHasMeleeSkill,
        //
        neverImpetuous: neverImpetuous,
        setNeverImpetuous: setNeverImpetuous,
        isFearless: isFearless,
        setIsFearless: setIsFearless,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex", //
        }}
      >
        <AppBar hiddenElements={[ID.COMPENDIMUM_DROPDOWN, ID.LIST_DISPLAY]} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
          }}
        >
          <MenuSwitch
            iconSize="25em" //
            bttnSize="2em"
            margin="0.5em"
          />
        </Box>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "50%",
            width: "50%",
            marginLeft: "5em",
            marginTop: "3em",
          }}
        >
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "35%",
            position: "fixed",
            top: "5%",
            left: "60%",
          }}
        >
          <CardPreview />
        </Box>
      </Box>
    </CardCreationProvider>
  );
};

export default CardCreator;
