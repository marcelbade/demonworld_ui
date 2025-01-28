// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { FormGroup, Grid, FormControlLabel, Checkbox } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// components and functions
import CustomIcon from "../shared/statCards/CustomIcon";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// icons
import blackBowIcon from "../../assets/icons/bow2.png";

const RangeWeaponCreator = () => {

  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const deleteRangedWeaponName = () => {
    CCC.setUnit({ ...CCC.unit, rangedWeapon: "x" });
  };

  const changeRangedWeaponName = (event) => {
    CCC.setUnit({ ...CCC.unit, rangedWeapon: event.target.value });
  };

  const deleteRangedAttackStats = () => {
    CCC.setUnit({ ...CCC.unit, rangedAttackStats: "" });
  };

  const changeRangedAttackStats = (event) => {
    CCC.setUnit({ ...CCC.unit, rangedAttackStats: event.target.value });
  };

  const deleteRangeSkill = () => {
    CCC.setUnit({ ...CCC.unit, skillRange: "" });
  };

  const changeRangeSkill = (event) => {
    CCC.setUnit({ ...CCC.unit, skillRange: event.target.value });

   };

  const unitHasRangeWeapon = () => {
    CCC.setHasRangedWeapon((prevState) => !prevState);
  };

  const unitHasRangeSkill = () => {
    CCC.setHasRangedSkill((prevState) => !prevState);
  };

  return (
    <Grid
      container
      justifyContent="flex-start" //
      direction="column"
      sx={{
        width: "50em",
      }}
    >
      <Grid item>
        <FormGroup
          sx={{
            width: "max-Content",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={CCC.hasRangedWeapon} //
                onChange={unitHasRangeWeapon}
              />
            }
            label={"Einheit hat eine Fernkampfwaffe"}
            labelPlacement="start"
          />
        </FormGroup>
      </Grid>

      {CCC.hasRangedWeapon ? (
        <Grid
          item //
          container
          direction="row"
          sx={theme.palette.cardCreator.box}
        >
          <CreatorTextInput
            id={"rangedWeaponName"} //
            value={CCC.rangedWeaponName}
            onClick={deleteRangedWeaponName}
            onChange={changeRangedWeaponName}
            label={"Fernkampfwaffe:"}
          />

          <CreatorTextInput
            id={"rangedAttackStats"} //
            value={CCC.rangedAttackStats}
            onClick={deleteRangedAttackStats}
            onChange={changeRangedAttackStats}
            label={"Fernkampfwert:"}
          />
          <Grid
            item //
            container
            direction="row"
            alignItems="center"
          >
            <Checkbox
              checked={!CCC.hasRangedSkill} //
              onChange={unitHasRangeSkill}
              sx={{
                marginTop: "0.5em",
              }}
              icon={
                <CustomIcon
                  icon={blackBowIcon} //
                  height={"20em"}
                  width={"20em"}
                />
              }
              checkedIcon={
                <CustomIcon
                  icon={blackBowIcon} //
                  checkedBoxIcon={true}
                  height={"20em"}
                  width={"20em"}
                />
              }
            />
            <CreatorTextInput
              id={"rangedAttackStats"} //
              value={CCC.rangeSkill}
              onClick={deleteRangeSkill}
              onChange={changeRangeSkill}
              disabled={!CCC.hasRangedSkill}
              width={"3em"}
            />
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default RangeWeaponCreator;
