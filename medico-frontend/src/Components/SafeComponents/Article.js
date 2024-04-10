import React, { useEffect, useState } from "react";
import { decodeToken, signOut } from "../../Services/auth";
import { Sidebar } from "./Sidebar";
import { CustomInput, CustomTextArea } from "../OfferComponents/Input";
import { useForm } from "react-hook-form";
import {
  addDivision,
  deleteDivision,
  getarticles,
} from "../../Services/division";
import Loader from "../../Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { addArticle, getArticles } from "../../Services/article";
import { styled } from "@mui/material/styles";
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

const AddArticleModal = ({ isOpen, onClose, setArticles, changeEffect }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const articleName = watch("articleName");
  const articleImg = watch("articleImg");
  const articleDescription = watch("articleDescription");

  const [loading, setLoading] = useState(false);

  const onsubmit = (data) => {
    setLoading(true);
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    console.log(data);
    let articleData = data;
    articleData.articlePhoto = "urllllllll";
    articleData.companyEmail = email;
    addArticle(articleData)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        changeEffect((e) => !e);
        onClose();
        reset();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white text-black p-4 rounded-md mx-4 md:w-4/12">
        <form onSubmit={handleSubmit(onsubmit)}>
          <p className="text-lg text-cyan-900 mb-6">Add Article</p>
          <div className="w-full px-2 md:mb-4">
            <CustomInput
              label={"Article Name"}
              placeholder={"Enter Article Name"}
              inputProps={{
                ...register("articleName", {
                  required: "Article Name is required",
                }),
                type: "text",
              }}
              error={errors?.articleName}
            />
          </div>
          <div className="w-full px-2 md:mb-4">
            <CustomInput
              label={"Article Image"}
              placeholder={"Uplaod"}
              inputProps={{
                ...register("articleImg", {
                  required: "Article Image is required",
                }),
                type: "file",
                accept: "image/*",
              }}
              error={errors?.articleImg}
            />
          </div>
          <div className="w-full px-2 md:mb-4">
            <CustomTextArea
              label={"Description"}
              placeholder={"Describe the division..."}
              inputProps={{
                ...register("articleDescription", {
                  required: "Description is required",
                }),
              }}
              error={errors?.articleDescription}
            />
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              {loading ? <Loader /> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RemoveArticleModal = ({ isOpen, onClose, currArt, changeEffect }) => {
  const [loading, setLoading] = useState(false);

  const onsubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteDivision(currArt)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        changeEffect((e) => !e);
        onClose();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        onClose();
      });
  };

  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white text-black p-4 rounded-md mx-4 md:w-4/12">
        <form onSubmit={onsubmit}>
          <p className="text-2xl text-cyan-900">Delete Division</p>
          <p className="text-lg text-black">
            Are you sure you want to delete division?
          </p>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              {loading ? <Loader /> : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Article(props) {
  const { changeLogin } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [articles, setArticles] = useState([]);
  const [currArt, setcurrArt] = useState(null);

  const [effect, setEffect] = useState(false);

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getArticles(email)
      .then((resp) => {
        setArticles(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [effect]);

  const logout = () => {
    signOut();
    changeLogin(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const columns = [
    {
      field: "articleName",
      headerName: "Article Name",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "articlePhoto",
      headerName: "articlePhoto",
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
          <Button
            variant="contained"
            onClick={() => {
              setcurrArt(params.id);
              openModal2();
            }}
            style={{ backgroundColor: "#f44336", color: "#ffffff" }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end gap-4">
            <button
              onClick={openModal}
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2"
            >
              Add Article
            </button>
          </div>
          <hr></hr>
        </div>
        <div className=" p-8">
          
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              // avatar={
              //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              //     R
              //   </Avatar>
              // }
              title="Shrimp and Chorizo Paella"
              // subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              image="https://plus.unsplash.com/premium_photo-1664036154109-31e0624d29c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
              alt="Paella dish"
              style={{ height: "350px" }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
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
        </div>
      </div>
      {/* Modal for adding division */}
      <AddArticleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        setArticles={setArticles}
        changeEffect={setEffect}
        l
      />
      <RemoveArticleModal
        isOpen={isModalOpen2}
        onClose={closeModal2}
        currArt={currArt}
        changeEffect={setEffect}
      />
    </div>
  );
}
