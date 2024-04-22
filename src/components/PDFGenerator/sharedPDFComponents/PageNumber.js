// react
import React from "react";
// fonts
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
// react-pdf
import { Font, Text } from "@react-pdf/renderer";
// styles
import { commonStyles } from "../pdfStyles/commonStyles";

// Register font
Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });

const PageNumber = () => {
  return <Text style={commonStyles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages} `} fixed />;
};
export default PageNumber;
