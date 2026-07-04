// React
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Material UI
import { Grid } from "@mui/material";
// components and functions
import CreateListScreen from "./CreateListScreen";
import LostPointDisplay from "./LostPointDisplay";
import LostUnitList from "./LostUnitList/LostUnitList";
import usePointCostCalculator from "../../customHooks/UsePointCostCalculator";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
import TopDrawerButton from "../shared/TopDrawerButton";
import UserAccountDialog from "../Login/UserAccountDialog";
// context
import { LossCalcContext } from "../../contexts/LossCalculatorContext";
import BackToTopContainer from "../shared/BackToTopContainer";
// icons
import customRedGameIcon from "../../assets/icons/logo_red.png";
// custom hooks
import useCustomMediaQuery from "../../customHooks/UseCustomMediaQuery";

const LossCalculator = () => {
  const location = useLocation();
  const calculator = usePointCostCalculator();

  const LC = useContext(LossCalcContext);
  const displaySize = useCustomMediaQuery();

  // Initializes the state by pulling the list from the history object. If none is present, an alternative UI is displayed
  useEffect(() => {
    if (
      location.state === undefined && //
      location.state.selectedArmy === undefined &&
      location.state.selectedArmy.length === 0
    ) {
      return;
    }

    LC.setList(location.state.selectedArmy);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    calculateCurrentTotalPointLoss();
  }, [LC.list]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function calculates current total point loss.
   */
  const calculateCurrentTotalPointLoss = () => {
    const sum = calculator.calculateTotalArmyPointLoss(LC.list);
    LC.setTotalPointsLost(sum);

    // mark destroyed units
    let tempArray = [...LC.list];
    tempArray.forEach((u) => setUnitDestroyedFlag(u));
  };

  /**
   * Function sets the unitDestroyed flag for a unit card object.
   * @param {unitCard obj} u
   * @returns unitCard obj
   */
  const setUnitDestroyedFlag = (u) => {
    u.unitDestroyed = u.lossCounter === u.maxHitpointCounter;
    return u;
  };

  return LC.list.length !== 0 ? (
    <>
      <Grid
        container //
        direction="row"
        justifyContent="center"
        size={12}
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
      <BackToTopContainer>
        <Grid
          container //
          width="100vw"
          height="100vh"
          direction={{ xs: "column", md: "row" }}
        >
          <Grid
            container //
            direction="column"
            justifyItems="start"
            alignItems="center"
            size={12}
          ></Grid>
          <LostPointDisplay totalPointsLost={LC.totalPointsLost} />
          <Grid
            container //
            size={12}
            height="70%"
            sx={{
              paddingTop: "1em",
              paddingLeft: "2em",
            }}
          >
            <LostUnitList list={LC.list} />
          </Grid>
        </Grid>
      </BackToTopContainer>
      <UserAccountDialog />
    </>
  ) : (
    <CreateListScreen />
  );
};

export default LossCalculator;
