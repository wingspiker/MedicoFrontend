import React, { useEffect, useState } from "react";
import { decodeToken, signOut } from "../../Services/auth";
import { Sidebar } from "./Sidebar";
import { CustomInput, CustomTextArea } from "../OfferComponents/Input";
import { useForm } from "react-hook-form";
import { addArticle, getArticles, deleteArticle } from "../../Services/article";
import Loader from "../../Loader";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { handleImageUpload } from "../../Services/upload";
import { Trash2 } from "lucide-react";

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
              placeholder={"Describe the article..."}
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
    console.log(currArt);
    deleteArticle(currArt)
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
  const [currArt, setCurrArt] = useState(null);

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

  return (
    <div className="flex h-screen bg-white text-slate-700">
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
          <hr />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-cyan-50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={article.articlePhoto}
                alt={article.articleName}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-cyan-900 mb-2">
                  {article.articleName}
                </h2>
                <p className="text-cyan-700 mb-4">
                  {article.articleDescription}
                </p>
                <button
                  onClick={() => {
                    setCurrArt(article.id);
                    openModal2();
                  }}
                  className="flex items-center justify-center w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors duration-300"
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
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
  );
}
