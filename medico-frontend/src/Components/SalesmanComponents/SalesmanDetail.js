import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import {
  decodeToken,
  isAdmin,
  isCompanySelf,
  signOut,
} from "../../Services/auth";
import { AdminSidebar } from "../Admin/AdminSidebar";
import { Sidebar } from "../SafeComponents/Sidebar";
import { useLocation } from "react-router-dom";
import { assignProduct, getSalesmanById } from "../../Services/salesman";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardHeader,
  Typography,
  Divider,
  Chip,
  Grid,
  Box,
  Button,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getAdminProducts, getCompanyProducts } from "../../Services/product";

export const ProductCard = (props) => {
  const { p, assignable, onAssign } = props;
  return (
    <Card sx={{ maxWidth: 345, padding: "8px" }}>
      <CardHeader title={p.drugName} subheader={p.brandName} />
      {/* {console.log(p.photoUrl)} */}
      <CardMedia
        component="img"
        image={p.photoUrl}
        alt={p.drugName}
        style={{ height: "100px" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {p.manufacturerName}
        </Typography>
        <Typography variant="body2" color="text.primary">
          MRP : <span className=" text-green-500 font-bold">₹ {p.mrp}</span>
        </Typography>
        {p.packSize && (
          <Typography variant="body2" color="text.primary">
            Dimension :
            <span className=" ms-2">
              X : <span className=" font-bold">{p.packSize.x}</span>{" "}
            </span>
            <span className="ms-2">
              Y : <span className=" font-bold">{p.packSize.y}</span>{" "}
            </span>
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary" onClick={() => onAssign(p)}>
          Assign
        </Button>
      </CardActions>
    </Card>
  );
};
export default function SalesmanDetail(props) {
  const { changeLogin } = props;
  const [isRed, setIsRed] = useState(false);
  const [fl, setFl] = useState(false);
  const [currSalesman, setCurrSalesman] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAssignProduct = () => {
    // console.log("Assigning", selectedProduct.id, "to salesman", currSalesman.id);
    // Assign product to salesman logic here

    assignProduct(currSalesman.id, selectedProduct.id)
    .then(resp=>{
      console.log(resp);
      handleCloseDialog();
      setFl(f=>!f)
    })
    .catch(err=>{
      console.log(err);
      handleCloseDialog();
    })
  };

  const location = useLocation();

  const sid = location.state?.sid || 0;
  const salesmanEmail = location.state?.salesmanEmail || "";
  // console.log(sid);

  useEffect(() => {
    getSalesmanById(salesmanEmail)
      .then((resp) => {
        setCurrSalesman(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fl]);

  const [companyProds, setCompanyProds] = useState([]);
  const [adminProds, setAdminProds] = useState([]);

  useEffect(() => {
    if (isCompanySelf()) {
      const user = decodeToken();
      const keys = Object.keys(user);
      const email = user[keys.find((k) => k.endsWith("emailaddress"))];

      getCompanyProducts(email)
        .then((resp) => {
          setCompanyProds(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (isAdmin()) {
      const user = decodeToken();
      const keys = Object.keys(user);
      const email = user[keys.find((k) => k.endsWith("emailaddress"))];

      getAdminProducts()
        .then((resp) => {
          setAdminProds(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const showErr = (msg) => {
    setIsRed(true);
    toast.error(msg);
  };
  const showSucc = (msg) => {
    setIsRed(false);
    toast.success(msg);
    setFl((f) => !f);
  };

  const history = useLocation();

  const logout = () => {
    signOut();
    changeLogin(false);
  };

  return (
    <div className="flex h-screen bg-cyan-900 text-white fixed w-full">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed ? "red" : "green"}` },
        }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Assign Product</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to assign {selectedProduct?.drugName} to Mr.
            {currSalesman?.firstName} {currSalesman?.lastName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAssignProduct} color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {isAdmin() ? (
        <AdminSidebar changeLogin={logout} />
      ) : (
        <Sidebar changeLogin={logout} />
      )}
      <div className="flex-1 ms-14">
        {/* {console.log(currSalesman)} */}
        <div>
          {isCompanySelf() && <div className="p-2 pt-3 flex justify-between gap-4">
            <h1 className="text-3xl font-semibold text-white">
              Salesman Detail
            </h1>
          </div>}
          {isAdmin() && <div className="p-4 pt-3 flex justify-between gap-4">
            <h1 className="text-3xl font-semibold text-white mt-4">
              Salesman Detail
            </h1>
          </div>}
          <hr />
          <div className="p-2">
            <div className="p-5 h-[88vh] overflow-auto no-scrollbar rounded shadow-lg">
              <h2 className="text-2xl font-semibold text-orange-500 mb-4">
                Personal Information
              </h2>
              <div className="space-y-2">
                <div className="flex items-center text-white">
                  <svg
                    className="h-5 w-5 text-blue-400 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <span>ID: {currSalesman?.salesmanId}</span>
                </div>
                <div className="flex items-center text-white">
                  <svg
                    className="h-5 w-5 text-green-400 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 11H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2zM5 13h14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z" />
                  </svg>
                  <span>
                    Name: {currSalesman?.firstName} {currSalesman?.lastName}
                  </span>
                </div>
                <div className="flex items-center text-white">
                  <svg
                    className="h-5 w-5 text-red-400 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M16 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 2v16h8V2H8z" />
                  </svg>
                  <span>Email: {currSalesman?.email}</span>
                </div>
                <div className="flex items-center text-white">
                  <svg
                    className="h-5 w-5 text-yellow-400 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 15.66V8.34C21 7.75 20.62 7.22 20.05 7.07l-7-2c-.38-.11-.78-.11-1.16 0l-7 2C3.38 7.22 3 7.75 3 8.34v7.32c0 .59.38 1.12.95 1.27l7 2c.18.05.37.08.55.08s.37-.03.55-.08l7-2c.57-.15.95-.68.95-1.27z" />
                  </svg>
                  <span>Mobile: {currSalesman?.mobileNumber}</span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mt-4 mb-3">
                Assigned Talukas
              </h2>
              <ul className="mt-2 space-y-2">
                {currSalesman?.areasAssigned.map((area) => (
                  <li
                    key={area.id}
                    className="flex items-center bg-gray-800 p-2 rounded-lg shadow w-fit"
                  >
                    <svg
                      className="h-4 w-4 text-orange-500 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V7.618a1 1 0 0 1 .553-.894L9 4"></path>
                      <path d="M15 4l5.447 2.724A1 1 0 0 1 21 7.618v8.764a1 1 0 0 1-.553.894L15 20"></path>
                      <path d="M9 4v16l6-3.382V7.618L9 4z"></path>
                    </svg>
                    <span className="text-white text-sm font-medium">
                      {area.name}
                    </span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mt-4 mb-3">
                Assigned Products
              </h2>
              {currSalesman?.assignedProducts.length === 0 && (
                <p className="text-white text-lg font-thin p-4">
                  No products assigned to this salesman
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {currSalesman?.assignedProducts.map((p) => (
                  <ProductCard p={p} assignable={false} />
                ))}
              </div>

              {isCompanySelf() && (
                <>
                  <h2 className="text-2xl font-semibold mt-4 mb-3">
                    Available Products to assign
                  </h2>
                  {companyProds.length === 0 && (
                    <p className="text-white text-sm font-thin p-4">
                      No products available to assign.
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {companyProds.map((p) => (
                      <ProductCard
                        key={p.id}
                        p={p}
                        assignable={false}
                        onAssign={handleOpenDialog}
                      />
                    ))}
                  </div>
                </>
              )}

              {isAdmin() && (
                <>
                  <h2 className="text-2xl font-semibold mt-4 mb-3">
                    Available Products to assign
                  </h2>

                  {/* {console.log(adminProds)} */}

                  {adminProds.map((company) => {
                    return (
                      <div key={company.id} className=" p-2">
                        <h2 className="text-xl font-semibold mt-4 mb-3">
                          {company.companyName}
                        </h2>
                        <hr className=" my-2"/>

                        {company.products.length === 0 && (
                          <p className="text-white text-sm font-thin p-4">
                            No products available to assign.
                          </p>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                          {company.products.map((p) => (
                            <ProductCard
                            key={p.id}
                              p={p}
                              assignable={false}
                              onAssign={handleOpenDialog}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* {companyProds.length === 0 && (
                    <p className="text-white text-sm font-thin p-4">
                      No products available to assign.
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {companyProds.map((p) => (
                      <ProductCard
                        p={p}
                        assignable={false}
                        onAssign={handleOpenDialog}
                      />
                    ))}
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
