// react
import React from "react";
// react-pdf
import { Page, View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../fonts/notMaryKate.ttf";
import Beryliumbold from "../../../fonts/Beryliumbold.ttf";
// functions and components
import { uuidGenerator } from "../../shared/sharedFunctions";
// styles
import styles from "../pdfStyles/detailedCardPdfStyles";
// pdf components
import NameRow from "./detailedCardsComponets/NameRow";
import UnitMovementRow from "./detailedCardsComponets/UnitMovementRow";
import RangeWeaponRow from "./detailedCardsComponets/RangeWeaponRow";
import MeleeWeaponRow from "./detailedCardsComponets/MeleeWeaponRow";
import SizeArmorSkill from "./detailedCardsComponets/SizeArmorSkill";
import FearAndMoralRow from "./detailedCardsComponets/FearAndMoralRow";
import HitPointsRow from "./detailedCardsComponets/HitPointsRow";
import SubfactionSubtitle from "./detailedCardsComponets/SubfactionSubtitle";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });
Font.register({ family: "Beryliumbold", src: Beryliumbold });

// Create the dynamic PDF content. Due to the limitations of react-pdf, this has to be done via a jerryrigged CSS table.
const ListPDF = (props) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.table}>
          {/* row */}

          {props.pdfMasterList
            .filter((subFaction) => subFaction.units.length > 0)
            .map((obj) => (
              <View style={styles.table}>
                {/* SUBFACTION NAME */}
                <SubfactionSubtitle subFaction={obj.subFaction} />
                {obj.units.map((u) => (
                  <View key={uuidGenerator()} style={styles.table}>
                    <NameRow unitName={u.unitName} />
                    <UnitMovementRow unit={u} />
                    <RangeWeaponRow unit={u} />
                    <MeleeWeaponRow weaponName={"Waffe1"} weapon={u.weapon1} />
                    {u.weapon2 === 0 ? null : <MeleeWeaponRow weaponName={"Waffe2"} weapon={u.weapon2} />}
                    {u.weapon3 === 0 ? null : <MeleeWeaponRow weaponName={"Waffe3"} weapon={u.weapon3} />}
                    <SizeArmorSkill unit={u} />
                    <FearAndMoralRow unit={u} />
                    <HitPointsRow hitPoints={u.hitpoints} />
                  </View>
                ))}
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};
export default ListPDF;
