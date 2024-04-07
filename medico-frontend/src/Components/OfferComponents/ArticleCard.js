import React, { useState } from "react";
import { Card, CardContent, Typography, Checkbox } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomInput } from "./Input";

const ArticleCard = ({ article }) => {
  const { register, setValue, watch, errors } = useFormContext();
  const watchSelectedArticles = watch("selectedArticles") || [];
  const checked = watchSelectedArticles.some(
    (selectedProduct) => selectedProduct?.articleId === article?.id
  );
  const [expanded, setExpanded] = useState(checked);

const handleCheckboxChange = (event) => {
  const updatedSelectedArticles = [...watchSelectedArticles];
  if (event.target.checked) {
    updatedSelectedArticles.push({
      articleId: article.id,
    });
    setExpanded(true);
  } else {
    const index = updatedSelectedArticles.findIndex(
      (selectedArticle) => selectedArticle.articleId === article.id
    );
    updatedSelectedArticles.splice(index, 1);
    setExpanded(false);
  }
  setValue("selectedArticles", updatedSelectedArticles);
};

  const handleInputChange = (event, field, index) => {
    const value = parseFloat(event.target.value);
    const updatedSelectedArticles = [...watchSelectedArticles];

    updatedSelectedArticles[index] = {
      ...updatedSelectedArticles[index],
      [field]: isNaN(value) ? "" : value,
    };

    setValue("selectedArticles", updatedSelectedArticles);
  };

  return (
    <label htmlFor={`checkbox-${article.id}`} style={{ cursor: "pointer" }}>
      <Card
        variant="outlined"
        style={{
          marginBottom: "16px",
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
          "&:hover": { boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" },
        }}
      >
        <CardContent
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Checkbox
              id={`checkbox-${article.id}`}
              checked={checked}
              onChange={handleCheckboxChange}
              style={{ color: "#fff", marginRight: "16px" }}
            />
            <Typography
              variant="h6"
              component="div"
              style={{ marginBottom: "8px", color: "#ffcc00" }}
            >
              {article.articleName}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <img
              src={article.articlePhoto}
              alt={article.id}
              style={{
                marginRight: "16px",
                borderRadius: "8px",
                width: "150px",
                height: "150px",
              }}
            />
            <div>
              <Typography
                color="text.secondary"
                style={{ marginBottom: "4px", color: "#66ff99" }}
              >
                ID: {article.id}
              </Typography>
              <Typography
                color="text.secondary"
                style={{ marginBottom: "4px", color: "#66ff99" }}
              >
                Description: {article.articleDescription}
              </Typography>
            </div>
          </div>
          <div className="h-[90px]">
             {expanded &&
              watchSelectedArticles.map((selectedArticle, index) => (
                <div key={index}>
                  {selectedArticle.articleId === article.id && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: "10px",
                        height: "100%",
                      }}
                    >
                      <CustomInput
                        label={"Quantity"}
                        inputProps={{
                          ...register(
                            `selectedArticles[${index}].quantity`,
                            {
                              required: "Quantity is required",
                            }
                          ),
                          variant: "outlined",
                          type: "number",
                          onChange: (e) =>
                            handleInputChange(e, "quantity", index),
                          className: "!w-36",
                        }}
                        error={
                          errors?.selectedArticles?.[index]?.quantity
                        }
                        style={{ marginBottom: "8px" }}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </label>
  );
};

export default ArticleCard;
