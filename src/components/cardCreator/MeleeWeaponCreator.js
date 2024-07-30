// react
import React, { useContext } from "react";
// material ui
import { Grid, Checkbox, IconButton } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
import CustomIcon from "../shared/statCards/CustomIcon";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// Icons
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import blackSwordIcon from "../../assets/icons/sword2.png";

const MeleeWeaponCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteMeleeWeaponName = () => {
    CCC.setMeleeWeaponName("");
  };

  const changeMeleeWeaponName = (event) => {
    CCC.setMeleeWeaponName(event.target.value);
  };

  const deleteMeleeValue = () => {
    CCC.setMeleeValue("");
  };

  const changeMeleeValue = (event) => {
    CCC.setMeleeValue(event.target.value);
  };

  const unitHasMeleeSkill = () => {
    CCC.setHasMeleeSkill((prevState) => !prevState);
  };

  const deleteMeleeSkill = () => {
    CCC.setMeleeSkill("");
  };

  const changeMeleeSkill = (event) => {
    CCC.setMeleeSkill(event.target.value);
  };

  const deleteChargeBonus = () => {
    CCC.setChargeBonus("");
  };

  const changeChargeBonus = (event) => {
    CCC.setChargeBonus(event.target.value);
  };

  const deleteInitiative = () => {
    CCC.setInitiative("");
  };

  const changeInitiative = (event) => {
    CCC.setInitiative(event.target.value);
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        marginTop: "1em",
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
      }}
    >
      <Grid
        container //
        item
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{
          width: "100%",
          marginBottom:"1em"
        }}
      >
        <CreatorTextInput
          id={"Initiative"} //
          value={CCC.initiative}
          onClick={deleteInitiative}
          onChange={changeInitiative}
          label={"Initiative:"}
          width={"7em"}
          marginSides={"1em"}
        />

        <CreatorTextInput
          id={"ChargeBonus"} //
          value={CCC.chargeBonus}
          onClick={deleteChargeBonus}
          onChange={changeChargeBonus}
          label={"Angriffsbonus:"}
          width={"9em"}
          marginSides={"1em"}
        />
      </Grid>

      {Array(CCC.lineNumber)
        .fill()
        .map((i) => {
          return (
            <Grid
              container
              justifyContent="center" //
              alignItems="center"
              direction="row"
              key={i}
              sx={{
                width: "max-content",
              }}
            >
              <Grid
                container
                item
                direction="row"
                sx={{
                  width: "max-content",
                }}
              >
                <CreatorTextInput
                  id={"MeleeWeaponName"} //
                  value={CCC.meleeWeaponName}
                  onClick={deleteMeleeWeaponName}
                  onChange={changeMeleeWeaponName}
                  label={"Nahkampfwaffe:"}
                  width={"15em"}
                  marginSides={"3em"}
                />

                <CreatorTextInput
                  id={"MeleeAttackStats"} //
                  value={CCC.meleeValue}
                  onClick={deleteMeleeValue}
                  onChange={changeMeleeValue}
                  label={"Nahkampfwert:"}
                  width={"15em"}
                  marginSides={"3em"}
                />
              </Grid>
              <Grid
                item //
                container
                direction="row"
                sx={{
                  width: "max-content",
                }}
              >
                <IconButton
                  onClick={() => {
                    CCC.setLineNumber(CCC.lineNumber + 1);
                  }}
                  size="large"
                >
                  <AddCircle />
                </IconButton>

                {CCC.lineNumber > 1 ? (
                  <IconButton
                    onClick={() => {
                      CCC.setLineNumber(CCC.lineNumber - 1);
                    }}
                    size="large"
                  >
                    <RemoveCircle />
                  </IconButton>
                ) : null}
              </Grid>
            </Grid>
          );
        })}
      <Grid
        item //
        container
        direction="row"
      >
        <Checkbox
          checked={!CCC.hasRangedSkill} //
          onChange={unitHasMeleeSkill}
          icon={
            <CustomIcon
              icon={blackSwordIcon} //
              height={"20em"}
              width={"20em"}
            />
          }
          checkedIcon={
            <CustomIcon
              icon={blackSwordIcon} //
              checkedBoxIcon={true}
              height={"20em"}
              width={"20em"}
            />
          }
        />
        <CreatorTextInput
          id={"meleeAttackStats"} //
          value={CCC.meleeSkill}
          onClick={deleteMeleeSkill}
          onChange={changeMeleeSkill}
          disabled={!CCC.hasMeleeSkill}
          width={"3em"}
        />
      </Grid>
    </Grid>
  );
};

export default MeleeWeaponCreator;
