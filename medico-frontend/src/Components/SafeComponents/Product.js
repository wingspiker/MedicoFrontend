import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { signOut, decodeToken, isCompanySelf } from "../../Services/auth";
import { Toaster, toast } from "sonner";
import { getProducts } from "../../Services/product";
import "react-tabulator/lib/styles.css";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

      console.log(isCompanySelf());
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
        <p className=" text-4xl text-white px-8 py-2">
            Products
          </p>
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
            return <Link to={`/Product/${i}`} state={{pid:p.id}} key={p.id}>
            <Card sx={{ maxWidth: 345, padding:'8px' }} >
                <CardHeader
                  // avatar={
                  //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  //     R
                  //   </Avatar>
                  // }
                  title={p.drugName}
                  subheader={p.brandName}
                />
                <CardMedia
                  component="img"
                  image={p.photoUrl}
                  alt="Paella dish"
                  style={{ height: "250px" }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {p.manufacturerName}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    MRP : <span className=" text-green-500 font-bold">₹ {p.mrp}</span> 
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Dimension :  
                    <span className=" ms-2">X : <span className=" font-bold">{p.packSize.x}</span> </span> 
                    <span className="ms-2">Y : <span className=" font-bold">{p.packSize.y}</span> </span> 
                  </Typography>
                </CardContent>
                {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions> */}
              </Card>
            </Link>
            ;
          })}
        </div>
        </div>
      </div>
    </div>
  );
}
