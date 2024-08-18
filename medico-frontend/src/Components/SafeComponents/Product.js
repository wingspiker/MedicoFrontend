import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { signOut, decodeToken, isCompanySelf } from "../../Services/auth";
import { Toaster, toast } from "sonner";
import { deleteProductById, getProducts } from "../../Services/product";
import "react-tabulator/lib/styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../Global/Button";
import { Eye, Trash2 } from "lucide-react";

export default function Product(props) {
  const navigate = useNavigate();
  const { changeLogin } = props;

  const [products, setProducts] = useState([]);
  const handleView = (id) => {
    console.log(id);
  };

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [eff, setEff] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedId);
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
  }, [eff]);

  const onAddProduct = () => {
    navigate("/company/Product/add");
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

  const handleDelete = (id) => {
    console.log(id);

    deleteProductById(id)
      .then((res) => {
        console.log(res);
        setOpen(false);
        setEff((e) => !e);
        showToast("Product Deleted Successfully", false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
        setEff((e) => !e);
        showToast("Error Deleting Product", true);
      });
  };
  return (
    <div className="flex h-screen bg-white text-slate-600">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed ? "red" : "green"}` },
        }}
      />
      {/* <Sidebar /> Add the Sidebar component */}
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end gap-4">
            <Button
              onClick={onAddProduct}
              className={"rounded-full bg-orange-500"}
            >
              Add Product
            </Button>
          </div>
          <hr></hr>
        </div>
        <p className=" text-4xl text-slate-600 font-bold px-8 py-2">Products</p>
        <div className=" min-h-[90vh] overflow-y-auto no-scrollbar">
          <div className=" p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* <DataGrid
            rows={products}
            columns={columns}
            autoHeight
            disableColumnMenu
            hideFooter
            className="w-full h-full bg-cyan-100"
          /> */}

            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-cyan-50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={product.photoUrl}
                    alt={product.drugName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <Link
                      to={`/company/Product/${index}`}
                      state={{ pid: product.id }}
                      className="bg-cyan-600 p-2 rounded-full hover:bg-cyan-700 transition-colors duration-300"
                    >
                      <Eye size={20} className="text-white" />
                    </Link>
                    <button
                      onClick={() => handleClickOpen(product.id)}
                      className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors duration-300"
                    >
                      <Trash2 size={20} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-cyan-900 mb-1">
                    {product.drugName}
                  </h2>
                  <p className="text-cyan-700 text-sm mb-2">
                    {product.brandName}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.manufacturerName}
                  </p>
                  <p className="text-cyan-800 font-medium mb-2">
                    MRP:{" "}
                    <span className="text-green-600 font-bold">
                      ₹ {product.mrp}
                    </span>
                  </p>
                  <p className="text-cyan-800 text-sm">
                    Dimension:
                    <span className="ml-2">
                      X: <span className="font-bold">{product.packSize.x}</span>
                    </span>
                    <span className="ml-2">
                      Y: <span className="font-bold">{product.packSize.y}</span>
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
