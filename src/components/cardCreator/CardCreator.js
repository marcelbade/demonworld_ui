// react
import { useEffect, useState } from "react";
// material ui
import { Grid } from "@mui/material";
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
import FormationsAndHordeCreator from "./components/FormationsAndHordeCreator";
import UnitMovementCreator from "./components/UnitMovementCreator";
import UnitAttributeCreator from "./components/UnitAttributeCreator";
import UnitTypeSelector from "./components/UnitTypeSelector";
import CardPreview from "./components/CardPreview";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
import CreateCustomCardPdf from "./components/CreateCustomCardPdf";
import IsMultiCardToggle from "./components/IsMultiCardToggle";
import MultiCardCreator from "./components/MultiCardCreator";
//  contexts
import CardCreationProvider from "../../contexts/cardCreationContext";
// custom hooks
import useAxios from "../../customHooks/UseAxios";
import useCustomMediaQuery from "../../customHooks/UseCustomMediaQuery";
// contants
import { MOST_COMMON_UNIT_TYPE_FOR_SUBFACTION } from "../../constants/URLs";
import TopDrawerButton from "../shared/TopDrawerButton";
// icons
import customRedGameIcon from "../../assets/icons/logo_red.png";

const CardCreator = () => {
  const callAxios = useAxios();
  const displaySize = useCustomMediaQuery();

  const [isNewFaction, setIsNewFaction] = useState(false);
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
    isAdditionalUnitCard: false,
  });

  const [additionalUnitCards, setAdditionalUnitCards] = useState([]);

  const setUnitType = (newType) => {
    setUnit({ ...unit, unitType: newType });
  };

  useEffect(() => {
    if (unit.faction !== "" && unit.subFaction !== "") {
      callAxios.fetchData(setUnitType, MOST_COMMON_UNIT_TYPE_FOR_SUBFACTION(unit.faction, unit.subFaction));
    }
  }, [unit.faction, unit.subFaction]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CardCreationProvider
      value={{
        unit: unit,
        setUnit: setUnit,
        //
        additionalUnitCards: additionalUnitCards,
        setAdditionalUnitCards: setAdditionalUnitCards,
        //
        isNewFaction: isNewFaction,
        setIsNewFaction: setIsNewFaction,
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
        //
        isFearless: isFearless,
        setIsFearless: setIsFearless,
      }}
    >
      <Grid container>
        <Grid
          container //
          direction={{ xs: "column" }}
          sx={{
            alignItems: { xs: "center" }, //
            position: "fixed",
          }}
        >
          <CollapsableTopMenuDrawer
            displayPageTitle={true} //
            title={""}
            logo={customRedGameIcon}
            hasLogo={true}
            displayNaviBttn={true}
            displayListBttns={true}
            logoWidth={displaySize.isTinyDisplay ? "250px" : "350px"}
          />
          <TopDrawerButton />
        </Grid>
        <Grid
          container
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            marginLeft: "5em",
            marginTop: "8em",
          }}
        >
          <FactionNameCreator />
          <NameCreator />
          <UnitTypeSelector />
          <IsMultiCardToggle />
          <MultiCardCreator />
          <SpecialElementsCreator />
          <UnitAttributeCreator />
          <FormationsAndHordeCreator />
          <UnitMovementCreator />
          <RangeWeaponCreator />
          <MeleeWeaponCreator />
          <SizeAndSkillCreator />
          <FearAndMoralCreator />
          <HitpointCreator />
          <SpecialRuleCreator />
          <PointCostCreator />
        </Grid>

        <Grid
          sx={{
            marginTop: "3em",
            direction: "column",
            width: "35%",
            position: "fixed",
            top: "5em",
            left: "60%",
          }}
        >
          <CardPreview />
          <SaveCardForm />
          <CreateCustomCardPdf />
        </Grid>
      </Grid>
    </CardCreationProvider>
  );
};

export default CardCreator;
