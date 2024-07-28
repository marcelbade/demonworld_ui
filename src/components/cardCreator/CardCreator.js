// react
import React, { useState } from "react";
// material ui
import { Grid, Checkbox, FormControlLabel, FormGroup, IconButton } from "@mui/material";
import NameCreator from "./NameCreator";
// components and functions
import UnitMovementCreator from "./UnitMovementCreator";
import RangeWeaponCreator from "./RangeWeaponCreator";
import MeleeWeaponCreator from "./MeleeWeaponCreator";
import InitiativeCreator from "./InitiativeCreator";
import SizeAndSkillCreator from "./SizeAndSkillCreator";
import HitpointCreator from "./HitpointCreator";
import SpecialElementsCreator from "./SpecialElementsCreator";
import SpecialRuleCreator from "./SpecialRuleCreator";
import PointCostCreator from "./PointCostCreator";
import FearAndMoralCreator from "./FearAndMoralCreator";
import ChargeBonusCreator from "./ChargeBonusCreator";
import FactionNameCreator from "./FactionNameCreator";
import { useTheme } from "@emotion/react";
import FormationsAndHordeCreator from "./FormationsAndHordeCreator";
import ManeuverCreator from "./ManeuverCreator";
import AppBar from "../shared/AppBar";
// constants
import { ID } from "../../constants/appBarConstants";
import MenuSwitch from "../shared/MenuSwitch";
import CardCreationProvider from "../../contexts/cardCreationContext";
// Icons
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const CardCreator = () => {
  const theme = useTheme();

  // name + subfaction name
  const [newFaction, setNewFaction] = useState(false);
  const [factionName, setFactionName] = useState("");
  const [subFactionName, setSubFactionName] = useState("");
  // melee weapons
  const [meleeWeaponName, setMeleeWeaponName] = useState("");
  const [meleeValue, setMeleeValue] = useState("");
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
  //
  const [hitpoints, setHitpoints] = useState("");
  //
  const [initiative, setInitiative] = useState("");
  //
  const [maneuver, setManeuver] = useState("");
  //
  const [unitName, setUnitName] = useState("");
  //
  const [pointCost, setPointCost] = useState("");
  //
  const [rangedWeaponName, setRangedWeaponName] = useState("");
  const [rangedAttackStats, setRangedAttackStats] = useState("");
  //
  const [size, setSize] = useState("");
  const [rangeArmor, setRangeArmor] = useState("");
  const [meleeArmor, setMeleeArmor] = useState("");
  const [rangeSkill, setRangeSkill] = useState("");
  const [meleeSkill, setMeleeSkill] = useState("");
  //
  const [leader, setLeader] = useState(true);
  const [banner, setBanner] = useState(false);
  const [musician, setMusician] = useState(false);
  //
  const [specialRule, setSpecialRule] = useState("");
  //
  const [move, setMove] = useState("");
  const [skirmish, setSkirmish] = useState("");
  const [charge, setCharge] = useState("");

  const isNewFaction = () => {
    setNewFaction((prevState) => !prevState);
  };

  return (
    <CardCreationProvider
      value={{
        newFaction: newFaction,
        factionName: factionName,
        meleeWeaponName: meleeWeaponName,
        meleeValue: meleeValue,
        lineNumber: lineNumber,
        subFactionName: subFactionName,
        chargeBonus: chargeBonus,
        fear: fear,
        moral1: moral1,
        moral2: moral2,
        wedge: wedge,
        skirmishFormation: skirmishFormation,
        square: square,
        horde: horde,
        hitpoints: hitpoints,
        initiative: initiative,
        maneuver: maneuver,
        pointCost: pointCost,
        unitName: unitName,
        rangedWeaponName: rangedWeaponName,
        rangedAttackStats: rangedAttackStats,
        size: size,
        rangeArmor: rangeArmor,
        meleeArmor: meleeArmor,
        rangeSkill: rangeSkill,
        meleeSkill: meleeSkill,
        leader: leader,
        banner: banner,
        musician: musician,
        specialRule: specialRule,
        move: move,
        charge: charge,
        skirmish: skirmish,
        setSpecialRule: setSpecialRule,
        setSkirmish: setSkirmish,
        setMove: setMove,
        setCharge: setCharge,
        setMeleeSkill: setMeleeSkill,
        setRangeArmor: setRangeArmor,
        setMeleeArmor: setMeleeArmor,
        setRangeSkill: setRangeSkill,
        setSize,
        setLeader: setLeader,
        setBanner: setBanner,
        setMusician: setMusician,
        setRangedWeaponName: setRangedWeaponName,
        setRangedAttackStats: setRangedAttackStats,
        setPointCost: setPointCost,
        setUnitName: setUnitName,
        setManeuver: setManeuver,
        setHitpoints: setHitpoints,
        setInitiative: setInitiative,
        setWedge: setWedge,
        setSkirmishFormation: setSkirmishFormation,
        setSquare: setSquare,
        setHorde: setHorde,
        setMoral2: setMoral2,
        setMoral1: setMoral1,
        setFear: setFear,
        setChargeBonus: setChargeBonus,
        setNewFaction: setNewFaction,
        setSubFactionName: setSubFactionName,
        setFactionName: setFactionName,
        setMeleeWeaponName: setMeleeWeaponName,
        setMeleeValue: setMeleeValue,
        setLineNumber: setLineNumber,
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "hotpink",
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
            item //
            container
            direction="column"
            sx={{
              width: "30em",
              backgroundColor: "orange",
            }}
          >
            {/* buttons! */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newFaction} //
                    onChange={isNewFaction}
                  />
                }
                label={"Neue Fraktion Erstellen"}
                labelPlacement="start"
              />
            </FormGroup>
            <IconButton
              onClick={() => {
                setLineNumber(lineNumber + 1);
              }}
              size="large"
            >
              <AddCircle />
            </IconButton>

            {lineNumber > 1 ? (
              <IconButton
                onClick={() => {
                  setLineNumber(lineNumber - 1);
                }}
                size="large"
              >
                <RemoveCircle />
              </IconButton>
            ) : null}
          </Grid>
          <Grid
            item
            container //
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "max-content",
              backgroundColor: theme.palette.statCards.backGround,
            }}
          >
            <FactionNameCreator />
            <NameCreator />
            <Grid
              container //
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                width: "100%",
                backgroundColor: "black",

              }}
            >
              <UnitMovementCreator />
              <ManeuverCreator />
              <FormationsAndHordeCreator />
            </Grid>
            <RangeWeaponCreator />
            <MeleeWeaponCreator />
            <InitiativeCreator />
            <ChargeBonusCreator />
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
