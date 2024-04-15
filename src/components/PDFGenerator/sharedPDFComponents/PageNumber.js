// react
import React from "react";
// fonts
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
// react-pdf
import { Document, Font, Text } from "@react-pdf/renderer";
// styles
import { commonStyles } from "../pdfStyles/commonStyles";

// Register font
Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });

const PageNumber = () => {
  return (
    <Document>
      <Text style={commonStyles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages} `} fixed />
    </Document>
  );
};
export default PageNumber;
