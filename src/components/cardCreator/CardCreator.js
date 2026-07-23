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
import SizeAndArmorCreator from "./components/SizeAndArmorCreator";
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
import TopDrawerButton from "../shared/TopDrawerButton";
//  contexts
import CardCreationProvider from "../../contexts/cardCreationContext";
// custom hooks
import useAxios from "../../customHooks/UseAxios";
import useCustomMediaQuery from "../../customHooks/UseCustomMediaQuery";
// contants
import { MOST_COMMON_UNIT_TYPE_FOR_SUBFACTION } from "../../constants/URLs";
import { unitBluePrint } from "./unitBluePrint";
// icons
import customRedGameIcon from "../../assets/icons/logo_red.png";

const CardCreator = () => {
  const callAxios = useAxios();
  const displaySize = useCustomMediaQuery();

  const [unitCards, setUnitCards] = useState([{ ...unitBluePrint }]);

  const [isNewFaction, setIsNewFaction] = useState(false);
  const [hasRangedWeapon, setHasRangedWeapon] = useState(false);
  const [hasRangedSkill, setHasRangedSkill] = useState(false);
  const [hasMeleeSkill, setHasMeleeSkill] = useState(false);
  const [isFearless, setIsFearless] = useState(false);
  const [neverImpetuous, setNeverImpetuous] = useState(false);

  const [displayedCard, setDisplayedCard] = useState({}); // TODO needed??
  const [displayedElement, setDisplayedElement] = useState(0);

  const setUnitType = (newType) => {
    let tempArray = [...unitCards];

    tempArray[0].unitType = newType;

    setUnitCards(tempArray);
  };

  useEffect(() => {
    if (unitCards[0].faction !== "" && unitCards[0].subFaction !== "") {
      callAxios.fetchData(setUnitType, MOST_COMMON_UNIT_TYPE_FOR_SUBFACTION(unitCards[0].faction, unitCards[0].subFaction));
    }
  }, [unitCards[0].faction, unitCards[0].subFaction]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CardCreationProvider
      value={{
        unitCards: unitCards,
        setUnitCards: setUnitCards,
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
        isFearless: isFearless,
        setIsFearless: setIsFearless,
        //
        neverImpetuous: neverImpetuous,
        setNeverImpetuous: setNeverImpetuous,
        //
        displayedCard: displayedCard,
        setDisplayedCard: setDisplayedCard,
        //
        displayedElement: displayedElement,
        setDisplayedElement: setDisplayedElement,
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
          <SizeAndArmorCreator />
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
