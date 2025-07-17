// axios
import axios from "axios";
//  react
import { useContext, useState, useEffect } from "react";
// material ui
import {
  Dialog, //
  IconButton,
  Grid2 as Grid,
} from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// contexts
import { UserContext } from "../../../contexts/userContext";
import { ArmyContext } from "../../../contexts/armyContext";
// hooks
import usePushMessages from "../../../customHooks/UsePushMessages";
// constants
import { DELETE_ARMY_LIST_URL, RETREIVE_ARMY_LIST_URL } from "../../../constants/URLs";
import { LOAD_ARMY_LIST_PROMPT } from "../../../constants/textsAndMessages";
import useUnitEnricher from "../../../customHooks/UseUnitEnricher";
import LoadedArmyList from "./LoadedArmyList";
import ListFactionFilter from "./ListFactionFilter";
import ListEventFilter from "./ListEventFilter";

const LoadArmyListPrompt = (props) => {
  const UC = useContext(UserContext);
  const AC = useContext(ArmyContext);

  const [allLists, setAllLists] = useState([]);
  const [filteredFaction, setFilteredFaction] = useState("");
  const [filteredEvent, setFilteredEvent] = useState("");

  const enrichUnit = useUnitEnricher();

  //TODO: pushmesssage: loading successful
  const pushMessages = usePushMessages();

  useEffect(() => {
    if (props.showArmyLoadPrompt) {
      fetchLists();
    }
  }, [props.showArmyLoadPrompt]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Async Function sends REST request and returns all stored lists
   * from the DB that either:
   * - were created by the user
   * - or have the user listed as having access
   */
  const fetchLists = async () => {
    axios
      .get(
        RETREIVE_ARMY_LIST_URL(UC.user.userName), //
        { headers: { Authorization: `Bearer ${UC.user.token}` } }
      )
      .then((response) => {
        setAllLists(response.data);
      })
      .catch((error) => console.log("error>>> ", error));
  };

  /**
   * Function closes the prompt
   */
  const handleClose = () => {
    props.setShowArmyLoadPrompt(false);
  };

  /**
   * Function loads the list entry into the army tool and closes the
   * prompt. In addtion, the necessary flags are added to the unit
   * and the equipment array.
   * @param {StoredListObj} listObj
   */
  // TODO ok, not working yet.
  const loadListintoTool = (listObj) => {
    AC.setSelectedFactionName(listObj.faction);
    AC.setPlayerName(listObj.userName);
    // TODO;
    // AC.setTeamName(listObj.teamName);

    let result = [];

    listObj.list.forEach((u) => {
      const appendedEquipment = addItemLostFlag(u.equipment);
      u.equipment = appendedEquipment;

      result.push(enrichUnit(u));
    });

    props.listSetter(result);
    props.setShowArmyLoadPrompt((prevState) => !prevState);
  };

  /**
   * Function adds an itemLost flag to every element
   * in the equipment array.
   * @param {itemCard} equipment
   * @returns the equipment array, with each item now an object.
   */
  const addItemLostFlag = (equipment) => {
    let result = [];

    if (equipment.length !== 0) {
      equipment.forEach((e) => {
        result.push({ ...e, itemLost: false });
      });
    }

    return result;
  };

  /**
   * Async function deletes an army list from the DB
   * @param {*} listObj
   */
  const deleteArmyListButton = async (listObj) => {
    axios
      .delete(
        DELETE_ARMY_LIST_URL(listObj.userName, listObj.listName), //
        { headers: { Authorization: `Bearer ${UC.user.token}` } }
      )
      .then((response) => {
        console.log("response list deleted>>", response);
      })
      .catch((error) => console.log("error>>> ", error));
  };

  const handleFilteredFactionInput = (event) => {
    if (event.target.value === LOAD_ARMY_LIST_PROMPT.SHOW_ALL_FACTIONS) {
      setFilteredFaction("");
      return;
    }
    setFilteredFaction(event.target.value);
  };

  console.log("filteredEvent >>>>>>", filteredEvent);
  console.log("filteredFaction >>>>", filteredFaction);

  const handleFilteredEventInput = (event) => {
    if (event.target.value === LOAD_ARMY_LIST_PROMPT.SHOW_EVERYTHING_REGARDLESS_OF_EVENT) {
      setFilteredEvent("");
      return;
    }

    setFilteredEvent(event.target.value);
  };

  return (
    <Dialog
      component={"form"}
      onSubmit={() => {}} // TODO needed?
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            minWidth: "50em",
            minHeight: "45em",
            padding: "1em",
          },
        },
      }}
      open={props.showArmyLoadPrompt}
    >
      <Grid
        container //
        direction="row"
        justifyContent="flex-end"
      >
        <IconButton
          sx={{ marginRight: "1em" }} //
          onClick={() => {
            handleClose();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid
        container
        spacing={3}
        direction="row"
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <ListFactionFilter
          allLists={allLists}
          handleFilteredFactionInput={handleFilteredFactionInput} //
        />
        <ListEventFilter
          allLists={allLists}
          handleFilteredEventInput={handleFilteredEventInput} //
        />
      </Grid>
      <LoadedArmyList
        allLists={allLists}
        filteredFaction={filteredFaction} //
        filteredEvent={filteredEvent}
        loadListintoTool={loadListintoTool}
        deleteArmyListButton={deleteArmyListButton}
      />
    </Dialog>
  );
};

export default LoadArmyListPrompt;
