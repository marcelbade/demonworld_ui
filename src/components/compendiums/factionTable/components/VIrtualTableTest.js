import { useEffect, useMemo, useRef, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
// Axios
import axios from "axios";
import {makeStyles} from "@material-ui/core";
import { Grid, IconButton, Typography } from "@mui/material";
// components & functions
import DetailedCardView from "./detailedCardView";
import { COMPENDIUM } from "../../../../constants/textsAndMessages";
import LightSwitch from "../../../shared/LightSwitch";
import MainMenuReturnButton from "../../../shared/MainMenuReturnButton";
import { columnGroupObjects, columnsStateObjects } from "./columnsStateObject";
//icons
import MenuIcon from "@mui/icons-material/Menu";
import FactionAndUnitSelectors from "./FactionAndUnitSelectors";
import OptionsDialog from "./OptionsDialog";
import TableProvider from "../../../../contexts/tableContext";

const VirtualTableTest = () => {
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setReceivedData(addLock(result.data));
  };

  useEffect(() => {
    setAllFactions(receivedData);
    setTableData(receivedData);
  }, [receivedData]); // eslint-disable-line react-hooks/exhaustive-deps

  const addLock = (rawUnits) => {
    for (let i = 0; i < rawUnits.length; i++) {
      rawUnits[i] = { ...rawUnits[i], unitLocked: false };
    }

    return rawUnits;
  };

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "middleName",
        header: "Middle Name",
        size: 170,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email Address",
        size: 300,
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        size: 250,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 300,
      },
      {
        accessorKey: "zipCode",
        header: "Zip Code",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "state",
        header: "State",
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 350,
      },
      {
        accessorKey: "petName",
        header: "Pet Name",
      },
      {
        accessorKey: "age",
        header: "Age",
      },
      {
        accessorKey: "salary",
        header: "Salary",
      },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
      },
      {
        accessorKey: "dateOfJoining",
        header: "Date of Joining",
      },
      {
        accessorKey: "isActive",
        header: "Is Active",
      },
    ],
    []
    //end
  );

  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef = useRef(null);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const table = useMaterialReactTable({
    columns,
    data, //10,000 rows
    defaultDisplayColumn: { enableResizing: true },
    enableBottomToolbar: false,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableGlobalFilterModes: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    muiTableContainerProps: { sx: { maxHeight: "600px" } },
    onSortingChange: setSorting,
    state: { isLoading, sorting },
    rowVirtualizerInstanceRef, //optional
    rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 2 }, //optionally customize the column virtualizer
  });

  return <MaterialReactTable table={table} />;
};

//virtualizerInstanceRef was renamed to rowVirtualizerInstanceRef in v1.5.0
//virtualizerProps was renamed to rowVirtualizerOptions in v1.5.0

export default VirtualTableTest;
