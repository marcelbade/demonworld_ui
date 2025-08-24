// react
import { useState } from "react";
// material ui
import { Box, Grid2 as Grid } from "@mui/material";
// functions and components
import SaveCardForm from "./components/SaveCardForm";
import FactionNameCreator from "./components/FactionNameCreator";
import FearAndMoralCreator from "./components/FearAndMoralCreator";
import HitpointCreator from "./components/HitpointCreator";
import MeleeWeaponCreator from "./components/MeleeWeaponCreator";
import NameCreator from "./components/NameCreator";
import PointCostCreator from "./components/PointCostCreator";
import RangeWeaponCreator from "./components/RangeWeaponCreator";
import SizeAndSkillCreator from "./components/SizeAndSkillCreator";
import SpecialElementsCreator from "./components/SpecialElementsCreator";
import SpecialRuleCreator from "./components/SpecialRuleCreator";
import UnitMovementCreator from "./components/UnitMovementCreator";
import UnitAttributeCreator from "./components/UnitAttributeCreator";
import UnitTypeSelector from "./components/UnitTypeSelector";
import SettingsMenu from "../shared/settings/SettingsMenu";
import CardPreview from "./components/CardPreview";
//  contexts
import CardCreationProvider from "../../contexts/cardCreationContext";

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
    equipment: [],
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
        <SettingsMenu />
        <Box
          sx={{
            display: "flex",
            direction: "column",
            position: "fixed",
          }}
        ></Box>
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
            container //
            direction="row"
          >
            <Grid
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
          <SaveCardForm />
        </Box>
      </Box>
    </CardCreationProvider>
  );
};

export default CardCreator;
