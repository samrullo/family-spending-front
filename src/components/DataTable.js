import { AgGridReact } from "ag-grid-react";
import React, { useEffect } from "react";
import { useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DataTable = ({ data,onRowClick }) => {
  const [rowData, setRowData] = useState(data);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const handleFilterChange = (event) => {
    const { column, filter } = event;

    if (filter) {
      const filterValue = filter.toLowerCase();

      const filteredRows = data.filter((row) =>
        row[column.field].toString().toLowerCase().includes(filterValue)
      );

      setRowData(filteredRows);
    } else {
      setRowData(data);
    }
  };

  const columnDefs = Object.keys(data[0]).map((columnKey) => ({
    field: columnKey,
    headerName: columnKey,
    filter: true,
    filterParams: {
      filterOptions: ["contains", "notContains", "startsWith", "endsWith"],
      suppressAndOrCondition: true,
    },
  }));

  return (
    <div className="container mt-5">
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "50%" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          onFilterChanged={handleFilterChange}
          onRowClicked={onRowClick}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default DataTable;
