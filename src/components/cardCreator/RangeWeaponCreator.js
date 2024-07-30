// react
import React, { useContext } from "react";
// material ui
import { FormGroup, Grid, FormControlLabel, Checkbox } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// components and functions
import CustomIcon from "../shared/statCards/CustomIcon";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// icons
import blackBowIcon from "../../assets/icons/bow2.png";

const RangeWeaponCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteRangedWeaponName = () => {
    CCC.setRangedWeaponName("");
  };

  const changeRangedWeaponName = (event) => {
    CCC.setRangedWeaponName(event.target.value);
  };

  const deleteRangedAttackStats = () => {
    CCC.setRangedAttackStats("");
  };

  const changeRangedAttackStats = (event) => {
    CCC.setRangedAttackStats(event.target.value);
  };

  const deleteRangeSkill = () => {
    CCC.setRangeSkill("");
  };

  const changeRangeSkill = (event) => {
    CCC.setRangeSkill(event.target.value);
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
          sx={{
            width: "50em",
            border: " solid 2px black",
            borderRadius: "10px",
          }}
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
          >
            <Checkbox
              checked={!CCC.hasRangedSkill} //
              onChange={unitHasRangeSkill}
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
