// import React, { useEffect, useState } from "react";
// import { CustomSelect, CustomCheckbox } from "../../OfferComponents/Input";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { DataGrid } from "@mui/x-data-grid";

// function AddPricing({
//   updatedBuyer,
//   setUpdatedBuyer,
//   buyers,
//   defaultPrice,
//   rowSelectionModel,
// }) {
//   const [rows, setRows] = useState([]);

//   // const temp = buyers.filter((b) => rowSelectionModel.includes(b.id));

//   // console.log("rOW SADASDADAD", temp);

//   useEffect(() => {
//     const temp = buyers.filter((b) => rowSelectionModel.includes(b.id));
//     console.log(temp);
//     const tempBuyers = buyers.map((b) => {
//       return {
//         Name: b.firstName + " " + b.lastName,
//         Occupation: b.occupation,
//         degree: b.degree ?? "NA",
//         price: defaultPrice ?? 0,
//       };
//     });
//     setRows(tempBuyers);
//     // setRows([]);
//     console.log(tempBuyers);
//   }, []);

//   // console.log(buyers);
//   const columns = [
//     {
//       field: "firstName",
//       headerName: "First Name",
//       flex: 1,
//       headerClassName: "table-header",
//       cellClassName: "table-cell",
//     },

//     {
//       field: "lastName",
//       headerName: "Last Name",
//       flex: 1,
//       headerClassName: "table-header",
//       cellClassName: "table-cell",
//     },
//     {
//       field: "occupation",
//       headerName: "Occupation",
//       flex: 1,
//       headerClassName: "table-header",
//       cellClassName: "table-cell",
//     },
//     {
//       field: "degree",
//       headerName: "Degree",
//       flex: 1,
//       headerClassName: "table-header",
//       cellClassName: "table-cell",
//     },
//     {
//       field: "price",
//       headerName: "Input Price",
//       width: 150,
//       headerClassName: "table-header",
//       editable: true,
//       renderCell: (params) => {
//         console.log(params);
//         return (
//           <input
//             type="number"
//             className="border"
//             value={params.row.price || ""}
//             onChange={(e) => {
//               const newRows = [...rows];
//               console.log(rows);
//               //   newRows[params.row.id].price = e.target.valueAsNumber;
//               setRows(newRows);
//             }}
//           />
//         );
//       },
//     },
//   ];
//   const theme = createTheme({
//     components: {
//       MuiDataGrid: {
//         styleOverrides: {
//           columnHeader: {
//             "&.MuiDataGrid-columnHeaderCheckbox": {
//               backgroundColor: "#4cabc1",
//               borderRadius: 0,
//             },
//           },
//         },
//       },
//     },
//   });

//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <div style={{ height: 400, width: "100%" }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             disableSelectionOnClick
//             hideFooter={true}
//             className="bg-white"
//           />
//         </div>
//       </ThemeProvider>
//     </>
//   );
// }

// export default AddPricing;

import React, { useEffect, useState } from "react";

function AddPricing({
  buyers,
  rowSelectionModel,
  defaultPrice,
  setUpdatedBuyer,
  updatedBuyer,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const temp = buyers.filter((b) => rowSelectionModel.includes(b.id));
    const formattedBuyers = temp.map((t) => {
      return {
        id: t.id,
        name: t.firstName || "" + " " + t.lastName || "",
        occupation: t.occupation,
        degree: t.degree || "NA",
        price: defaultPrice,
      };
    });
    setData(formattedBuyers);
  }, []);

  const handleInputChange = (e, id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, price: e.target.value };
      }
      return item;
    });
    setData(newData);
  };

  return (
    <>
      <div className="overflow-x-auto">
        {data && (
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(data[0]).map((k) => {
                  if (k === "id") {
                    return null;
                  }
                  return <th key={k}>{k}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-b border-gray-200">
                  {Object.keys(data[0]).map((k) => {
                    if (k === "id") {
                      return null;
                    }
                    if (k === "price") {
                      return (
                        <td key={k} className="text-left py-2 px-4">
                          <input
                            type="number"
                            value={row[k]}
                            onChange={(e) => handleInputChange(e, row.id)}
                          />
                        </td>
                      );
                    }
                    return (
                      <td key={k} className="text-left py-2 px-4">
                        {row[k]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default AddPricing;
