import React, { useState } from "react";
import { CustomSelect, CustomCheckbox } from "../../OfferComponents/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function ShowBuyer({ setRowSelectionModel, rowSelectionModel, buyers }) {
  const columns = [
    // { field: "id", headerName: "ID", flex: 1 },
    {
      field: "Name",
      headerName: "Name",
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
    // { field: "address", headerName: "Address", flex: 1 },
    // { field: "taluka", headerName: "Taluka", flex: 1 },
    // { field: "documentLinks", headerName: "Document Links", flex: 1 },
  ];

  const rows = [
    {
      id: "d612dda2-a4fb-4653-94a3-629782560271",
      firstName: "Arjun",
      lastName: "Gupta",
      occupation: "Doctor",
      degree: "Master of Surgery",
      address: null,
      taluka: null,
      documentLinks: null,
    },
    {
      id: "e98095da-5f6e-4524-b21b-e4c63f9e1d85",
      firstName: "Zara",
      lastName: "Sharma",
      occupation: "Doctor",
      degree: "Master of Surgery",
      address: null,
      taluka: null,
      documentLinks: null,
    },
    {
      id: "ea5929b9-2de3-4afb-9a24-ee549abf38a0",
      firstName: "Rohan",
      lastName: "Das",
      occupation: "Doctor",
      degree: "Master of Surgery",
      address: null,
      taluka: null,
      documentLinks: null,
    },
    {
      id: "4b7d0858-5f10-425f-90bd-c9a90d7c9432",
      firstName: "Aarav",
      lastName: "Patel",
      occupation: "Doctor",
      degree: "Master of Surgery",
      address: null,
      taluka: null,
      documentLinks: null,
    },
    {
      id: "5f9f9853-8bbd-48a1-b9a4-5771f64df211",
      firstName: "Ananya",
      lastName: "Verma",
      occupation: "Doctor",
      degree: "Master of Surgery",
      address: null,
      taluka: null,
      documentLinks: null,
    },
    {
      id: "ac25337f-3973-4804-86e1-524fbf558552",
      firstName: "Shaan",
      lastName: "Gupta",
      occupation: "Medical Store",
      degree: null,
      address: null,
      taluka: null,
      documentLinks: null,
    },
    {
      id: "436cf952-686f-4248-b66b-6a1cfe14fbc6",
      firstName: "Diya",
      lastName: "Sharma",
      occupation: "Medical Store",
      degree: null,
      address: null,
      taluka: null,
      documentLinks: null,
    },
    {
      id: "9bb2f4cf-da8b-47c3-bb43-c4c946dac0de",
      firstName: "Yashvi",
      lastName: "Jain",
      occupation: "Medical Store",
      degree: null,
      address: null,
      taluka: null,
      documentLinks: null,
    },
  ];
  const formattedBuyers = buyers.map((b) => {
    // console.log(b.firstName + " " + b.lastName);
    return {
      ...b,
      Name: b.firstName + " " + b.lastName,
      degree: b.degree ?? "NA",
    };
  });

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
    <ThemeProvider theme={theme}>
      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={formattedBuyers}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            console.log(newRowSelectionModel);
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          hideFooter={true}
          className=" bg-cyan-100"
          componentsProps={{
            headerCheckbox: {
              style: {
                backgroundColor: "green",
                "& .MuiCheckbox-root": {
                  backgroundColor: "green",
                },
              },
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default ShowBuyer;
