// material ui
import {
  Dialog,
  FormControlLabel,
  Checkbox,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid2 as Grid,
  Stack,
} from "@mui/material";
// components and functions
import BackToTopContainer from "../shared/BackToTopContainer";
// constants
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
import { useState } from "react";
import SpellPrintDialogList from "./SpellPrintDialogList";
import SpellPrintDialogOptions from "./SpellPrintDialogOptions";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const SpellPrintDialog = (props) => {
  const [allBoxesChecked, setAllBoxesChecked] = useState(false);
  // options
  const [showEffectChecked, setShowEffectChecked] = useState(true);
  const [showRequirementsChecked, setShowRequirementsChecked] = useState(true);
  const [ShowDurationChecked, setShowDurationChecked] = useState(true);
  const [showTierchecked, setShowTierchecked] = useState(true);
  const [showTargetchecked, setShowTargetchecked] = useState(true);
  // use abbreviated effect text?
  const [showAbbreviationchecked, setShowAbbreviationchecked] = useState(false);

  const handleClose = () => {
    props.setShowPrintTypeDialog(false);
  };

  const checkAllBoxes = () => {
    if (!allBoxesChecked)
      props.displaySpells.forEach((s) => {
        s.isSelected = true;
      });
    else if (allBoxesChecked) {
      props.displaySpells.forEach((s) => {
        s.isSelected = false;
      });
    }

    props.setDisplaySpells([...props.displaySpells]);
  };

  const optionsTable = [
    {
      labelText: SPELL_COMPENDIUM.PRINT_ABBREVIATED_EFFECT,
      checked: showAbbreviationchecked,
      controlFunction: setShowAbbreviationchecked,
    },
    {
      labelText: SPELL_COMPENDIUM.PRINT_EFFECT,
      checked: showEffectChecked,
      controlFunction: setShowEffectChecked,
    },
    {
      labelText: SPELL_COMPENDIUM.PRINT_REQUIREMENTS,
      checked: showRequirementsChecked,
      controlFunction: setShowRequirementsChecked,
    },
    {
      labelText: SPELL_COMPENDIUM.PRINT_DURATION,
      checked: ShowDurationChecked,
      controlFunction: setShowDurationChecked,
    },
    {
      labelText: SPELL_COMPENDIUM.PRINT_TIER,
      checked: showTierchecked,
      controlFunction: setShowTierchecked,
    },
    {
      labelText: SPELL_COMPENDIUM.PRINT_TARGET,
      checked: showTargetchecked,
      controlFunction: setShowTargetchecked,
    },
  ];

  return (
    <Dialog
      open={props.showListTypeDialog} //
      onClose={handleClose}
    >
      <BackToTopContainer>
        <FormControlLabel
          sx={{ marginBottom: "2em", marginTop: "2em" }}
          control={
            <Checkbox
              checked={allBoxesChecked}
              onChange={() => {
                setAllBoxesChecked((prevState) => !prevState);
                checkAllBoxes();
              }}
              sx={{ marginLeft: "16px" }}
            />
          }
          label={SPELL_COMPENDIUM.PRINT_EVERYTHING}
          labelPlacement="end"
        />

        <Accordion
          defaultExpanded
          sx={{
            boxShadow: "none", //
          }}
        >
          <AccordionSummary>
            <Stack direction="row">
              <Typography>Sprüche</Typography>
              <KeyboardArrowDown />
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <SpellPrintDialogList
              displaySpells={props.displaySpells} //
              setDisplaySpells={props.setDisplaySpells}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            boxShadow: "none", //
          }}
        >
          <AccordionSummary>
            <Stack direction="row">
              <Typography>Optionen</Typography>
              <KeyboardArrowDown />
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <SpellPrintDialogOptions optionsTable={optionsTable} />
          </AccordionDetails>
        </Accordion>

        <Grid
          container
          justifyContent="center"
          sx={{
            width: "100%", //
            padding: "1em",
          }}
        >
          <Button
            variant="outlined" //
            onClick={() => {
              props.createPrintableFile();
              handleClose();
            }}
          >
            {SPELL_COMPENDIUM.PRINT_LIST}
          </Button>
        </Grid>
      </BackToTopContainer>
    </Dialog>
  );
};

export default SpellPrintDialog;
