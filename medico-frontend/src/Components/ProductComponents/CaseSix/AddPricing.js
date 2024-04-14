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
  setUpdatedBuyer,
  updatedBuyer,
  data,
  cols,
  setData,
  defaultPrice,
  setErSix
}) {
  const [errors, setErrors] = useState({});

  const isError = () =>{
    const e = Object.keys(errors);
    const e2 = e.map(el=>errors[el].length > 0);
    setErSix(e2.length>0)
  }
  // useEffect(() => {
  //   const selectedBuyers = buyers.filter((b) =>
  //     rowSelectionModel.includes(b.id)
  //   );
  //   const formattedBuyers = selectedBuyers.map((buyer) => ({
  //     id: buyer.id,
  //     name: `${buyer.firstName} ${buyer.lastName}`,
  //     occupation: buyer.occupation,
  //     degree: buyer.degree || "NA",
  //     price: defaultPrice,
  //   }));
  //   setData(formattedBuyers);
  //   if (formattedBuyers.length > 0) {
  //     setCols(Object.keys(formattedBuyers[0]));
  //   }
  // }, [buyers, rowSelectionModel, defaultPrice]);

  const handleInputChange = (e, id) => {
    isError();
    const newPrice = e.target.value;
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, price: newPrice };
      }
      return item;
    });
    setData(newData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]:
        Number(newPrice) < Number(defaultPrice)
          ? "Price must be higher than default price."
          : "",
    }));
  };

  return (
    <>
      <div className="overflow-x-auto">
        {data.length > 0 && (
          <div className="rounded-lg overflow-hidden border border-gray-600">
            <table className="min-w-full text-white">
              <thead className="bg-cyan-300">
                <tr>
                  {cols.map((col, index) => {
                    if (col === "id") return null;
                    return (
                      <th
                        key={col}
                        className={`text-lg text-gray-700 font-semibold py-2 px-4 capitalize ${
                          index !== cols.length - 1 ? "border-r" : ""
                        } border-gray-600`}
                      >
                        {col}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b text-gray-900 border-gray-600 bg-gray-200"
                  >
                    {cols.map((col, index) => {
                      if (col === "id") return null;
                      if (col === "price") {
                        return (
                          <td
                            key={col}
                            className={`text-lg py-2 px-4 border-2 ${
                              index !== cols.length - 1 ? "border-r" : ""
                            } border-gray-600 border-y-0`}
                          >
                            <div>
                              <input
                                type="number"
                                value={row[col]}
                                onChange={(e) => handleInputChange(e, row.id)}
                                className="w-full border-2 bg-gray-100 border-gray-600 rounded-md py-1 px-2 focus:outline-none focus:border-blue-500"
                              />
                              {errors[row.id] && (
                                <div className="text-red-500 text-xs mt-1">
                                  {errors[row.id]}
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      }
                      return (
                        <td
                          key={col}
                          className={`text-lg py-2 px-4 ${
                            index !== cols.length - 1 ? "border-r" : ""
                          } border-gray-600`}
                        >
                          {row[col]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default AddPricing;
