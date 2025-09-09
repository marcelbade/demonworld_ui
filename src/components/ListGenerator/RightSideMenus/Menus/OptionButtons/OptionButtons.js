// React
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { Grid2 as Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
// context
import { ArmyContext } from "../../../../../contexts/armyContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import { UserContext } from "../../../../../contexts/userContext";
// components and functions
import calculateScoutingFactor from "../../../../../gameLogic/scoutFactorCalculator/scoutingFactorCalculator";
import useSubFactionStats from "../../../../../customHooks/UseSubFactionStats";
import LoginDialog from "../../../../Dialogs/LogInDialog/LogInDialog";
import SelectPdfTypeDialog from "../../../../Dialogs/SelectPdfTypeDialog/SelectPdfTypeDialog";
import StoreArmyListDialog from "../../../../Dialogs/StoreArmyListDialog/StoreArmyListDialog";
import LoadArmyListDialog from "../../../../Dialogs/LoadArmyDialog/LoadArmyListDialog";
import ArmyAndScoutingPointDisplay from "../../../ArmyListView/ArmyList/ArmyListFooter/ArmyAndScoutingPointDisplay";
import CustomIcon from "../../../../shared/CustomIcon";
import BackToSelectionButton from "../../../../shared/BackToSelectionButton";
import DeleteArmyListButton from "../../../../shared/DeleteArmyListButton";
// icons
import deathIcon from "../../../../../assets/icons/icons8-death-64.png";
import listUpdateIcon from "../../../../../assets/icons/listUpdateIcon.svg";
import customPdfIcon from "../../../../../assets/icons/customPDFIcon.svg";
import customLoadIcon from "../../../../../assets/icons/customLoadIcon.svg";
import customSaveIcon from "../../../../../assets/icons/customSaveIcon.svg";
// constants
import { OPTIONS, PDF } from "../../../../../constants/textsAndMessages";
import { PDF_URL } from "../../../../../constants/URLs";
import ArmyMetaDataInput from "../../../ArmyListView/ArmyList/ArmyListHeader/ArmyMetaDataInput";

const OptionButtons = () => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);
  const UC = useContext(UserContext);

  const history = useHistory();
  const stats = useSubFactionStats();

  const [showPdfTypeDialog, setShowPdfTypeDialog] = useState(false);
  const [showArmySaveDialog, setShowArmySaveDialog] = useState(false);
  const [showArmyLoadDialog, setShowArmyLoadDialog] = useState(false);
  const [isExistingList, setIsExistingList] = useState(false);

 
  const ICON_SIZE_RESET_BUTTONS = "1.75em";

  /**
   * Function takes the current army list as an object, stores it in the history object and naviagates to the LossCalculator component.
   */
  const navigateToLossCalculator = () => {
    history.push({
      pathname: "/lossCalculator",
      state: {
        lastPage: "listGenerator",
        selectedArmy: SEC.selectedUnits,
      },
    });
  };

  /**
   * Function opens the pdf generator in a new tab and sends all data needed via the window object.
   */
  const openPDfInNewTab = (options) => {
    const URL = PDF_URL;
    const transportObj = createPDFData(options);

    window.localStorage.setItem("transportObj", JSON.stringify(transportObj));
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  /**
   * Function creates the data structure for the PDF view.
   * @returns an array of objects eacdh containing all data for one subFaction of the army list.
   */
  const createPDFData = (options) => {
    let list = [];
    let selectedUnits = [...SEC.selectedUnits];

    const allSelectedCards = addCardsForMultiStateUnits(selectedUnits);

    AC.distinctSubFactions.forEach((distinctSubFaction) => {
      const subFactionUnits = allSelectedCards.filter((u) => u.subFaction === distinctSubFaction);
      list.push({
        subFaction: distinctSubFaction,
        units: subFactionUnits,
        subFactionTotal: stats.currentTotal(subFactionUnits),
        subFactionPercentage: stats.currentPercentage(subFactionUnits, SEC.maxPointsAllowance),
        minSubFactionPercentage: stats.minAndMaxAllowance(AC.selectedFactionName, distinctSubFaction).min,
        maxSubFactionPercentage: stats.minAndMaxAllowance(AC.selectedFactionName, distinctSubFaction).max,
      });
    });

    return {
      playerName: AC.playerName,
      teamName: AC.teamName,
      armyName: AC.armyName,
      list: list,
      scoutingFactor: calculateScoutingFactor(selectedUnits),
      totalArmyPoints: SEC.maxPointsAllowance,
      options: options,
    };
  };

  /**
   * Function adds the missing cards for multi state units to the array of selected cards.
   * If a unit has multiple stat cards, then only one is displayed by the app and can be selected for the list.
   * The function puts those card objects back to ensure that the detailed PDF contains all cards needed.
   * @param {[unitCards]} selectedUnits
   * @returns a unitCard array with the all cards for multi state units added.
   */
  const addCardsForMultiStateUnits = (selectedUnits) => {
    selectedUnits.forEach((u) => {
      if (u.isMultiStateUnit) {
        const subFaction = AC.subFactionDTOs.find((sF) => sF.name === u.subFaction);
        const cards = subFaction.units.filter(
          (subFactionUnit) =>
            subFactionUnit.unitName.includes(u.unitName) && //
            subFactionUnit.multiStateOrderNumber > 1
        );

        cards.forEach((c) => selectedUnits.push(c));
      }
    });

    return selectedUnits;
  };

  const displayStoreArmyDialog = () => {
    UC.userLoggedIn ? setShowArmySaveDialog(true) : UC.setDisplayLogInDialog(true);
  };

  const showLoadListPrompt = () => {
    UC.userLoggedIn ? setShowArmyLoadDialog(true) : UC.setDisplayLogInDialog(true);
  };

  const buttons = [
    {
      // create pdf button
      disabled: SEC.selectedUnits.length === 0,
      action: () => {
        setShowPdfTypeDialog(true);
      },
      icon: (
        <CustomIcon
          icon={customPdfIcon} //
          altText={OPTIONS.TO_LOSS_CALCULATOR}
          height={"65px"}
          width={"65px"}
          boxHeight={"70px"}
          boxWidth={"62px"}
        />
      ),
      text: PDF.CREATE_PDF,
    },

    {
      // store army list
      disabled: SEC.selectedUnits.length === 0,
      action: () => {
        setIsExistingList(false);
        displayStoreArmyDialog();
      },
      icon: (
        <CustomIcon
          icon={customSaveIcon} //
          altText={OPTIONS.TO_LOSS_CALCULATOR}
          height={"55px"}
          width={"55px"}
          boxHeight={"60px"}
          boxWidth={"60px"}
        />
      ),
      text: OPTIONS.STORE_LIST,
    },
    {
      // update army list
      disabled: !UC.userLoggedIn,
      action: () => {
        setIsExistingList(true);
        displayStoreArmyDialog();
      },
      icon: (
        <CustomIcon
          icon={listUpdateIcon} //
          altText={OPTIONS.TO_LOSS_CALCULATOR}
          height={"65px"}
          width={"65px"}
          boxHeight={"70px"}
          boxWidth={"70px"}
        />
      ),
      text: OPTIONS.UPDATE_LIST,
    },
    {
      // load army lists /delete army lists
      disabled: false,
      action: () => {
        showLoadListPrompt();
      },
      icon: (
        <CustomIcon
          icon={customLoadIcon} //
          altText={OPTIONS.TO_LOSS_CALCULATOR}
          height={"65px"}
          width={"65px"}
          boxHeight={"70px"}
          boxWidth={"70px"}
        />
      ),
      text: OPTIONS.LOAD_LIST,
    },

    {
      // go to loss calculator
      disabled: SEC.selectedUnits.length === 0,
      action: () => {
        navigateToLossCalculator();
      },
      icon: (
        <CustomIcon
          icon={deathIcon} //
          altText={OPTIONS.TO_LOSS_CALCULATOR}
          height={"80px"}
          width={"80px"}
          boxHeight={"80px"}
          boxWidth={"80px"}
        />
      ),
      text: OPTIONS.TO_LOSS_CALCULATOR,
    },
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      spacing={4}
      sx={{
        width: "20vw",
        padding: "2em",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <Stack
        direction="column" //
        spacing={6}
        sx={{
          marginBottom: "5em",
        }}
      >
        <ArmyMetaDataInput />
        <ArmyAndScoutingPointDisplay />
      </Stack>
      <Grid
        container //
        direction="row"
        spacing={10}
      >
        <Grid
          container
          direction="column" //
          spacing={4}
          sx={{
            paddingTop: "0.7em",
          }}
        >
          <BackToSelectionButton iconSize={ICON_SIZE_RESET_BUTTONS} />
          <DeleteArmyListButton iconSize={ICON_SIZE_RESET_BUTTONS} />
        </Grid>
        <Grid
          container
          direction="column" //
          justifyContent="center"
          alignContent="center"
          spacing={3}
        >
          {/* draw all identical buttons dynamically */}
          {buttons.map((bttn, i) => (
            <Tooltip title={<Typography sx={{ fontSize: "20px" }}>{bttn.text}</Typography>}>
              <span>
                <IconButton
                  key={i}
                  disabled={bttn.disabled} //
                  onClick={bttn.action}
                  sx={{}}
                >
                  {bttn.icon}
                </IconButton>
              </span>
            </Tooltip>
          ))}
        </Grid>
      </Grid>
      <LoginDialog />
      <SelectPdfTypeDialog
        openPDfInNewTab={openPDfInNewTab} //
        setShowPdfTypePrompt={setShowPdfTypeDialog}
        showPdfTypePrompt={showPdfTypeDialog}
      />
      <StoreArmyListDialog
        showArmySaveDialog={showArmySaveDialog} //
        setShowArmySaveDialog={setShowArmySaveDialog} //
        isExistingList={isExistingList}
      />
      <LoadArmyListDialog
        showArmyLoadPrompt={showArmyLoadDialog} //
        setShowArmyLoadPrompt={setShowArmyLoadDialog} //
      />
    </Grid>
  );
};

export default OptionButtons;
