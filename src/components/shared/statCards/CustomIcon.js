import React from "react";

const CustomIcon = (props) => {
  return (
    <img
      src={props.icon} //
      alt={props.altText}
      height={props.height}
      width={props.width}
    />
  );
};

export default CustomIcon;
