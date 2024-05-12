import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { CustomInput } from "./Input";

const ArticlePreviewCard = ({ article }) => {
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
                  value: article.quantity,
                  variant: "outlined",
                  type: "number",
                  className: "w-36",
                  disabled: true,
                }}
                style={{ marginBottom: "8px" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </label>
  );
};

export default ArticlePreviewCard;
