import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { signOut, decodeToken, isCompanySelf } from "../../Services/auth";
import { Toaster, toast } from "sonner";
import { deleteProductById, getProducts } from "../../Services/product";
import "react-tabulator/lib/styles.css";
import { Button } from "@mui/material";
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
        setEff(e=>!e)
        showToast('Product Deleted Successfully', false)
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
        setEff(e=>!e)
        showToast('Error Deleting Product', true)
      });
  };
  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed?'red':'green'}`},
        }}
      />
      {/* <Sidebar /> Add the Sidebar component */}
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end gap-4">
            <button
              onClick={onAddProduct}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Product
            </button>
          </div>
          <hr></hr>
        </div>
        <p className=" text-4xl text-white px-8 py-2">Products</p>
        <div className=" h-[90vh] overflow-y-auto no-scrollbar">
          <div className=" p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* <DataGrid
            rows={products}
            columns={columns}
            autoHeight
            disableColumnMenu
            hideFooter
            className="w-full h-full bg-cyan-100"
          /> */}

            {products.map((p, i) => {
              return (
                <Card sx={{ maxWidth: 345, padding: "8px" }} key={p.id}>
                  <CardHeader
                    title={p.drugName}
                    subheader={p.brandName}
                    action={
                      <>
                        <Link to={`/company/Product/${i}`} state={{ pid: p.id }}>
                          <IconButton aria-label="view">
                            <VisibilityIcon sx={{ color: "blue" }} />
                          </IconButton>
                        </Link>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleClickOpen(p.id)}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                      </>
                    }
                  />
                  <CardMedia
                    component="img"
                    image={p.photoUrl}
                    alt={p.drugName}
                    style={{ height: "250px" }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {p.manufacturerName}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      MRP:{" "}
                      <span className="text-green-500 font-bold">
                        ₹ {p.mrp}
                      </span>
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Dimension:
                      <span className="ms-2">
                        X: <span className="font-bold">{p.packSize.x}</span>
                      </span>
                      <span className="ms-2">
                        Y: <span className="font-bold">{p.packSize.y}</span>
                      </span>
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
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
