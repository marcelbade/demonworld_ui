// React
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import {
  Grid,
  Button,
  Fade,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { uuidGenerator } from "../../shared/sharedFunctions";
// Icons
import ErrorIcon from "@mui/icons-material/Error";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// context
import { ArmyContext } from "../../../contexts/armyContext";
import { VALIDATION } from "../../../constants/textsAndMessages";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
    padding: "2em",
  },

  button: {
    width: "15em",
    padding: "2em",
    height: "5em",
  },
  cardTest: {
    width: "100%",
  },
  errorIcon: {
    color: "red",
  },
  warningBox: {
    border: "red 0.2em solid ",
    borderRadius: "1em",
    marginBottom: "0.2em",
  },
});

const OptionButtons = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const history = useHistory();

  const [disableButtons, setDisableButtons] = useState(true);
  const [displayMessages, setDisplayMessages] = useState([]);
  const [displayCount, setDisplayCount] = useState(true);

  // enable buttons if list is valid
  useEffect(() => {
    AC.selectedUnits.length === 0 || violatesRules(AC.listValidationResults) ? setDisableButtons(true) : setDisableButtons(false);
  }, [AC.selectedUnits, AC.listValidationResults]); // eslint-disable-line react-hooks/exhaustive-deps

  // set the display messages
  useEffect(() => {
    let tempArray = [];

    if (AC.listValidationResults.subFactionBelowMinimum.length > 0) {
      AC.listValidationResults.subFactionBelowMinimum.forEach((u) => tempArray.push(u.message));
    }
    if (!AC.listValidationResults.commanderIspresent) {
      tempArray.push(VALIDATION.NO_COMMANDER_WARNING);
    }

    setDisplayMessages([...tempArray]);
  }, [AC.listValidationResults]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function checks whether the list is valid.
   * @param {[unitCard]} blockedUnits
   * @returns boolean flag; true if list is invalid (no commander OR 1 or more subfaction below min. )
   */
  const violatesRules = (blockedUnits) => {
    return blockedUnits.subFactionBelowMinimum.length > 0 || blockedUnits.commanderIspresent === false;
  };

  const showCount = () => {
    setDisplayCount(!displayCount);
  };

  /**
   * Function graps the current army list as an object, stores it in the history object and naviagat3s to the LossCalculator component.
   */
  const navigateToLossCalculator = () => {
    history.push({
      pathname: "/lossCalculator",
      state: {
        lastPage: "listGenerator",
        selectedArmy: AC.selectedUnits,
      },
    });
  };

  /**
   * Function opens the pdf generator in a new tab and sends all data needed via the window object.
   */
  const openPDfInNewTab = () => {
    //TODO: replace in production!!
    const URL = "http://localhost:3000/PdfBox";

    let transportObj = { pdfData: AC.pdfMasterList };

    window.localStorage.setItem("transportObj", JSON.stringify(transportObj));
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  // TODO STUD. Replace with REST Call once DB and BE are parts are done.
  const storeList = () => {
    // Call REST
  };

  return (
    <Grid container direction="column" alignItems="flex-start" spacing={4} className={classes.overlay}>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={disableButtons}
          onClick={() => {
            AC.resetTheState();
          }}
        >
          Liste löschen
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={disableButtons}
          onClick={() => {
            openPDfInNewTab();
          }}
        >
          PDF Erzeugen
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={disableButtons}
          onClick={() => {
            storeList();
          }}
        >
          Liste Speichern
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={disableButtons}
          onClick={() => {
            navigateToLossCalculator();
          }}
        >
          Zum Verlustrechner
        </Button>
      </Grid>
      <Grid item className={classes.cardTest}>
        <Accordion
          onChange={() => {
            showCount();
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {displayCount ? (
              <Fade in timeout={500}>
                <Avatar>{displayMessages.length}</Avatar>
              </Fade>
            ) : null}
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {displayMessages.map((m) => {
                return (
                  <Fade in key={uuidGenerator()} timeout={2500}>
                    <ListItem key={uuidGenerator()} className={classes.warningBox}>
                      <ListItemAvatar key={uuidGenerator()}>
                        <ErrorIcon key={uuidGenerator()} className={classes.errorIcon} />
                      </ListItemAvatar>
                      <ListItemText key={uuidGenerator()} primary={m} />
                    </ListItem>
                  </Fade>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default OptionButtons;
