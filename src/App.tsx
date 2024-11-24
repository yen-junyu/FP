import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { AgGridReact as AgGridReactType } from "ag-grid-react/lib/agGridReact";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import RegressionTestPage from "./Page/RegressionTestPage";
import AppA from "./Page/editable";
import AAA from "./Page/AAA";
import TestCaseDemo from "./Page/TestCaseDemo/TestCaseDemo";

const App = () => {
  const gridRef = useRef<AgGridReactType>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Athlete Details",
      children: [{ field: "athlete" }, { field: "age" }, { field: "country" }],
    },
    {
      headerName: "Sports Results",
      children: [
        { field: "sport" },
        { field: "total", columnGroupShow: "closed" },
        { field: "gold", columnGroupShow: "open" },
        { field: "silver", columnGroupShow: "open" },
        { field: "bronze", columnGroupShow: "open" },
      ],
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    undefined
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from server
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e: any) => {
    if (gridRef.current) {
      gridRef.current.api.deselectAll();
    }
  }, []);

  return (
    <div>
      {/* Example using Grid's API */}

      {/* <RegressionTestPage></RegressionTestPage>
      <AAA></AAA> */}
      <TestCaseDemo></TestCaseDemo>
      {/* <AppA></AppA> */}
    </div>
  );
};

export default App;
