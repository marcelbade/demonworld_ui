// react
import React, { useContext, useEffect } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid, IconButton, Typography } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// import CustomIcon from "../../shared/CustomIcon";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// constants
// import { CREATOR } from "../../../constants/textsAndMessages";
// Icons
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlined from "@mui/icons-material/RemoveCircleOutlined";
import { Stack } from "@mui/system";

/**
 * Component that gives the option to create multiple unit cards for a
 * singe unit.
 * @returns A JSX component
 */
const MultiCardCreator = () => {
  const theme = useTheme();
  const CCC = useContext(CardCreationContext);

  // create the first addditional card automatically
  useEffect(() => {
    if (CCC.unit.isMultiStateUnit && CCC.additionalUnitCards.length === 0) {
      addMultiCard();
    }
  }, [CCC.unit.isMultiStateUnit]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function is called by textfield onChange function. Is passed the
   * array index to determine which card is being edited.
   * @param {integer} cardNumber array index
   * @param {object} event
   */
  const changeMultiCardName = (cardNumber, event) => {
    let tempArray = [...CCC.additionalUnitCards];

    tempArray[cardNumber].multiCardName = event.target.value;

    CCC.setAdditionalUnitCards([...tempArray]);
  };

  const addMultiCard = () => {
    let tempArray = [...CCC.additionalUnitCards];
    tempArray.push({
      ...CCC.unit, //
      belongsToUnit: CCC.unit.unitName,
      isAdditionalUnitCard: true,
    });

    CCC.setAdditionalUnitCards([...tempArray]);
  };

  const RemoveMultiCard = (cardNumber) => {
    let tempArray = [...CCC.additionalUnitCards];
    tempArray.splice(cardNumber, 1);
    CCC.setAdditionalUnitCards([...tempArray]);
  };

  return CCC.unit.isMultiStateUnit ? (
    <Grid
      container //
      direction={{ xs: "column" }}
      sx={theme.palette.cardCreator.box}
    >
      {CCC.additionalUnitCards.map((card, i) => (
        <Stack
          direction={"row"} //
          sx={{ marginTop: "1em" }}
          key={i}
        >
          <CreatorTextInput
            id={card.unitName} //
            value={card.multiCardName}
            onChange={(event) => {
              changeMultiCardName(i, event);
            }}
            label={card.unitName}
          />
          <IconButton
            onClick={addMultiCard} //
          >
            <AddCircleOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              RemoveMultiCard(i);
            }} //
            sx={{ marginLeft: "1em" }}
          >
            <RemoveCircleOutlined />
          </IconButton>
        </Stack>
      ))}
    </Grid>
  ) : null;
};

export default MultiCardCreator;
