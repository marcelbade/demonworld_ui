// react
import { useContext } from "react";
import { useTheme } from "@emotion/react";
// material ui
import { FormGroup, Grid, FormControlLabel, Checkbox } from "@mui/material";
// components and functions
import SelectionInput from "../../shared/selectionInput";
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { ArmyContext } from "../../../contexts/armyContext";
import { CardCreationContext } from "../../../contexts/cardCreationContext";
import { GameDataContext } from "../../../contexts/gameDataContext";
// constants
import { CREATOR } from "../../../constants/textsAndMessages";

const FactionNameCreator = () => {
  const theme = useTheme();

  const AC = useContext(ArmyContext);
  const CCC = useContext(CardCreationContext);
  const GDC = useContext(GameDataContext);

  /**
   * Function sets the list of available faction names. If no selection has happened, it shows all names.
   * If a faction has already been selected, clearFactionName() is called.
   * @returns an array of Strings
   */
  const setFactionList = () => {
    const resultingList =
      CCC.unitCards[0].faction === "" || CCC.unitCards[0].faction === undefined //
        ? GDC.allFactionNames
        : clearFactionName();

    return resultingList;
  };

  /**
   * Function sets faction attribute of the state when user makes a selection.
   * @param {String} name selected faction name.
   */
  const handleFactionInput = (name) => {
    let tempArray = [...CCC.unitCards];

    tempArray[0].faction = name;

    CCC.setUnitCards(tempArray);
  };

  /**
   * Function sets the content of the dropdown menu when the user
   * decides to change their selection. Shows all factions minus the currently selected one.
   * @returns array of Strings
   */
  const clearFactionName = () => {
    return GDC.allFactionNames.filter((f) => f !== CCC.unitCards[0].faction);
  };

  /**
   * Function sets the list of available sub faction names. If no selection has happened, it shows all names.
   * If a faction has already been selected, clearSubFactionName() is called.
   * @returns an array of Strings
   */
  const setSubFactionList = () => {
    if (CCC.unitCards[0].faction !== "") {
      return AC.fetchedFactions
        .find((f) => f.factionName === CCC.unitCards[0].faction) // find army obj
        .subFactions.map((sF) => sF.name) // return array of sub faction names
        .filter((sf) => sf !== CCC.unitCards[0].subFaction); // do not show current selection in the dropdown list
    } else {
      return [];
    }
  };

  /**
   * Function sets sub faction attribute of the state when user makes a selection.
   * @param {String} name selected sub faction name.
   */
  const handleSubFactionInput = (name) => {
    let tempArray = [...CCC.unitCards];

    tempArray[0].subFaction = name;

    CCC.setUnitCards(tempArray);
  };

  /**
   * Function sets the content of the dropdown menu when the user
   * decides to change their selection. Shows all factions minus the currently selected one.
   * @returns array of Strings
   */
  const clearSubFactionName = () => {
    const faction = AC.fetchedFactions.filter((f) => f.factionName === CCC.unitCards[0].faction);
    return faction.subFactions.map((sF) => sF.name);
  };

  /**
   * Function deletes current selection.
   */
  const deleteFactionName = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[0].faction = "";

    CCC.setUnitCards(tempArray);
  };

  /**
   * Function changes the faction for ALL unitcards belonging to
   * the created unit. Is called by the onChange event.
   * @param {object} event
   */
  const changeFactionName = (event) => {
    let tempArray = [...CCC.unitCards];

    for (let i = 0; i < tempArray.length; i++) {
      tempArray[i].faction = event.target.value;
    }

    CCC.setUnitCards(tempArray);
  };

  /**
   * Function deletes current selection.
   */
  const deleteSubFactionName = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[0].subFaction = "";
    CCC.setUnitCards(tempArray);
  };

  /**
   * Function changes the sub faction for ALL unitcards belonging to
   * the created unit. Is called by the onChange event.
   * @param {object} event
   */
  const changeSubFactionName = (event) => {
    let tempArray = [...CCC.unitCards];

    for (let i = 0; i < tempArray.length; i++) {
      tempArray[i].subFaction = event.target.value;
    }

    CCC.setUnitCards(tempArray);
  };

  /**
   * Function sets flag that switches between faction + sub faction selection
   * and creating a new faction.
   */
  const toggleNewFaction = () => {
    CCC.setIsNewFaction((prevState) => !prevState);
  };

  return (
    <Grid
      container //
      direction={{ xs: "column" }}
      sx={{
        ...theme.palette.cardCreator.name,
        alignItems: "center",
      }}
    >
      <Grid
        container //
        sx={{
          justifyContent: "flex-start",
          width: "50em",
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={CCC.isNewFaction} //
                onChange={toggleNewFaction}
                sx={theme.palette.cardCreator.checkbox}
              />
            }
            label={CREATOR.NEW_FACTION}
            labelPlacement="start"
          />
        </FormGroup>
      </Grid>
      <Grid
        container //
        direction={{ xs: "row" }}
        sx={{
          justifyContent: "center",
        }}
      >
        {CCC.isNewFaction ? (
          <Grid
            container
            direction={{ xs: "row" }}
            sx={{
              paddingBottom: "2em",
              ...(CCC.isNewFaction //
                ? theme.palette.animation.fadeIn
                : null),
            }}
          >
            <CreatorTextInput
              id={"factionName"} //
              value={CCC.unitCards[0].factionName}
              onClick={deleteFactionName}
              onChange={changeFactionName}
              label={CREATOR.FACTION_NAME}
              marginSides="1em"
              width={"20em"}
            />

            <CreatorTextInput
              id={"subFactionName"} //
              value={CCC.unitCards[0].subFactionName}
              onClick={deleteSubFactionName}
              onChange={changeSubFactionName}
              label={CREATOR.SUBFACTION_NAME}
              width={"20em"}
            />
          </Grid>
        ) : (
          <Grid container direction={{ xs: "row" }}>
            <Grid>
              <SelectionInput
                isArmySelector={false}
                filterFunction={handleFactionInput}
                clearFunction={clearFactionName}
                alternatives={setFactionList()}
                label={CREATOR.FACTION_NAME}
                width={"20em"}
              />
            </Grid>
            <Grid>
              <SelectionInput
                isArmySelector={false}
                filterFunction={handleSubFactionInput}
                clearFunction={clearSubFactionName}
                alternatives={setSubFactionList()}
                label={CREATOR.SUBFACTION_NAME}
                width={"20em"}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default FactionNameCreator;
