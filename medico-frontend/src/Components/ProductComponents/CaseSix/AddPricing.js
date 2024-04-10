import React, { useEffect, useState } from "react";
import { CustomSelect, CustomCheckbox } from "../../OfferComponents/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

function AddPricing({
  updatedBuyer,
  setUpdatedBuyer,
  buyers,
  defaultPrice,
  rowSelectionModel,
}) {
  const [rows, setRows] = useState([]);

  const temp = buyers.filter((b) => rowSelectionModel.includes(b.id));
  console.log("rOW SADASDADAD", temp);

  // useEffect(() => {
  //   const temp = buyers.filter((b) => rowSelectionModel.includes(b.id));
  //   console.log(temp);
  //   const tempBuyers = buyers.map((b) => {
  //     return {
  //       Name: b.firstName + " " + b.lastName,
  //       Occupation: b.occupation,
  //       degree: b.degree ?? "NA",
  //       price: defaultPrice ?? 0,
  //     };
  //   });
  //   setRows(tempBuyers);
  //   // setRows([]);
  //   console.log(tempBuyers);
  // }, []);

  // console.log(buyers);
  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },

    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "degree",
      headerName: "Degree",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "price",
      headerName: "Input Price",
      width: 150,
      headerClassName: "table-header",
      editable: true,
      renderCell: (params) => {
        console.log(params);
        return (
          <input
            type="number"
            className="border"
            value={params.row.price || ""}
            onChange={(e) => {
              const newRows = [...rows];
              console.log(rows);
              //   newRows[params.row.id].price = e.target.valueAsNumber;
              setRows(newRows);
            }}
          />
        );
      },
    },
  ];
  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          columnHeader: {
            "&.MuiDataGrid-columnHeaderCheckbox": {
              backgroundColor: "#4cabc1",
              borderRadius: 0,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={temp}
            columns={columns}
            disableSelectionOnClick
            hideFooter={true}
            className="bg-white"
          />
        </div>
      </ThemeProvider>
    </>
  );
}

export default AddPricing;
