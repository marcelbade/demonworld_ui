// React
import { useEffect, useState } from "react";
// notistack
import { useSnackbar } from "notistack";
// components and functions

const ValidationNotification = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.show) {
      enqueueSnackbar(props.text, {
        persist: true,
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  }, [props.show]); //  eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default ValidationNotification;
