// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { FormGroup, Grid, FormControlLabel, Checkbox } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// components and functions
import CustomIcon from "../../shared/CustomIcon";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// icons
import blackBowIcon from "../../../assets/icons/bow2.png";
import { CREATOR } from "../../../constants/textsAndMessages";

const RangeWeaponCreator = () => {
  const ICON_SIZE = "100%";

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
      direction={{ xs: "column" }}
      sx={{
        justifyContent: "flex-start",
        width: "50em",
      }}
    >
      <Grid>
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
                sx={theme.palette.cardCreator.checkbox}
              />
            }
            label={CREATOR.UNIT_HAS_RANGE_WEAPON}
            labelPlacement="start"
          />
        </FormGroup>
      </Grid>

      {CCC.hasRangedWeapon ? (
        <Grid
          container //
          direction={{ xs: "row" }}
          sx={theme.palette.cardCreator.box}
        >
          <CreatorTextInput
            id={"rangedWeaponName"} //
            value={CCC.rangedWeaponName}
            onClick={deleteRangedWeaponName}
            onChange={changeRangedWeaponName}
            label={CREATOR.RANGE_WEAPON}
          />

          <CreatorTextInput
            id={"rangedAttackStats"} //
            value={CCC.rangedAttackStats}
            onClick={deleteRangedAttackStats}
            onChange={changeRangedAttackStats}
            label={CREATOR.RANGE_VALUE}
          />
          <Grid
            container //
            direction={{ xs: "row" }}
            sx={{ alignItems: "center" }}
          >
            <Checkbox
              checked={!CCC.hasRangedSkill} //
              onChange={unitHasRangeSkill}
              sx={{
                marginTop: "0.5em",
                marginLeft: "1.5em",
                marginRight: "1em",
                height: "3em",
                width: "3em",
              }}
              icon={
                <CustomIcon
                  icon={blackBowIcon} //
                  height={ICON_SIZE}
                  width={ICON_SIZE}
                />
              }
              checkedIcon={
                <CustomIcon
                  icon={blackBowIcon} //
                  checkedBoxIcon={true}
                  height={ICON_SIZE}
                  width={ICON_SIZE}
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
