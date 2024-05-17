import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { decodeToken, signOut } from "../../Services/auth";
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
import { addArticle, getArticles, deleteArticle } from "../../Services/article";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { handleImageUpload } from "../../Services/upload";
import { useNavigate } from "react-router-dom";

const AddArticleModal = ({ isOpen, onClose, setArticles, changeEffect }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const articleName = watch("articleName");
  const articleImg = watch("articleImg");
  const articleDescription = watch("articleDescription");

  const [loading, setLoading] = useState(false);

  const handleOnFileChange = (e) => {
    handleImageUpload(e)
      .then((res) => {
        setValue("articleImg", res.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  const onsubmit = (data) => {
    setLoading(true);
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    let articleData = data;
    articleData.articlePhoto = articleImg;
    articleData.email = email;
    addArticle(articleData)
      .then((resp) => {
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
              placeholder={"Upload"}
              inputProps={{
                required: "Article Image is required",
                type: "file",
                onChange: handleOnFileChange,
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
    deleteArticle(currArt)
      .then((resp) => {
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
          <p className="text-2xl text-cyan-900">Delete Article</p>
          <p className="text-lg text-black">
            Are you sure you want to delete this article?
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

export default function AdminArticles(props) {
  const { changeLogin } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [articles, setArticles] = useState([]);
  const [currArt, setCurrArt] = useState(null);

  const [effect, setEffect] = useState(false);

  const navigate = useNavigate();

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

  return (
    <>
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
          <div className=" p-8 flex gap-6">
            {articles.map((a) => (
              <Card className=" flex-1" sx={{ maxWidth: 345 }} key={a.id}>
                <CardHeader
                  title={a.articleName}
                />
                <CardMedia
                  component="img"
                  image={a.articlePhoto}
                  alt={a.articleName}
                  style={{ height: "350px" }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {a.articleDescription}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setCurrArt(a.id);
                      openModal2();
                    }}
                    style={{ backgroundColor: "#f44336", color: "#ffffff", marginTop: '1rem' }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <AddArticleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          setArticles={setArticles}
          changeEffect={setEffect}
        />
        <RemoveArticleModal
          isOpen={isModalOpen2}
          onClose={closeModal2}
          currArt={currArt}
          changeEffect={setEffect}
        />
      </div>
    </>
  );
}
