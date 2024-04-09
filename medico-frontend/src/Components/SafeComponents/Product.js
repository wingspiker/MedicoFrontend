import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { signOut, decodeToken } from "../../Services/auth";
import { Toaster, toast } from "sonner";
import { getProducts } from "../../Services/product";
import "react-tabulator/lib/styles.css";
import { ReactTabulator } from "react-tabulator";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function Product(props) {
  const navigate = useNavigate();
  const { changeLogin } = props;

  const [products, setProducts] = useState([]);
  const handleView = (id) => {
    console.log(id);
  };

  const columns = [
    {
      field: "drugName",
      headerName: "Product Name",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "brandName",
      headerName: "Brand Name",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "manufacturerName",
      headerName: "Manufacturer Name",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "mrp",
      headerName: "Maximum Retail Price",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button variant="contained" onClick={() => handleView(params.row.id)}>
            View
          </Button>
        );
      },
    },
  ];
  const rows = [
    {
      id: 1,
      drugName: "Product 1",
      brandName: "Brand 1",
      manufacturerName: "Manufacturer 1",
      mrp: 10.99,
    },
    {
      id: 2,
      drugName: "Product 2",
      brandName: "Brand 2",
      manufacturerName: "Manufacturer 2",
      mrp: 20.99,
    },
    {
      id: 3,
      drugName: "Product 3",
      brandName: "Brand 3",
      manufacturerName: "Manufacturer 3",
      mrp: 30.99,
    },
    // Add more rows as needed
  ];

  // const columns = [
  //   { title: "Product Name", field: "drugName", width: 150, formatter:'star' },
  //   { title: "Brand Name", field: "brandName", width: 150 },
  //   { title: "Manufacturer Name", field: "manufacturerName", width: 200 },
  //   { title: "Maximum Retail Price", field: "mrp", hozAlign: "center" }
  // ];

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getProducts(email)
      .then((res) => {
        console.log(res);
        setProducts(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const onAddProduct = () => {
    navigate("/Product/add");
  };

  const logout = () => {
    signOut();
    changeLogin(false);
  };
  const [isRed, setIsRed] = useState(true);

  const showToast = (message, isRed) => {
    setIsRed(isRed);
    if (isRed) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };
  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      {/* <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed?'red':'green'}`},
        }}
      /> */}
      {/* <Sidebar /> Add the Sidebar component */}
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end">
            <button
              onClick={onAddProduct}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Product
            </button>
          </div>
          <hr></hr>
        </div>
        <div className=" p-8">
          <DataGrid
            rows={products}
            columns={columns}
            autoHeight
            disableColumnMenu
            hideFooter
            className="w-full h-full bg-cyan-100"
          />
        </div>
      </div>
    </div>
  );
}
