import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { CustomInput } from "./Input";

const PreviewCard = ({ product, boxBase }) => {
  return (
    <label htmlFor={`checkbox-${product.id}`} style={{ cursor: "pointer" }}>
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
              {product.drugName}
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
              src={product.photoUrl}
              alt={product.drugName}
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
                Brand: {product.brandName}
              </Typography>
              <Typography
                color="text.secondary"
                style={{ marginBottom: "4px", color: "#66ff99" }}
              >
                Manufacturing Name: {product.manufacturingName}
              </Typography>
              <Typography
                color="text.secondary"
                style={{ marginBottom: "4px", color: "#66ff99" }}
              >
                Manufacturer Name: {product.manufacturerName}
              </Typography>
              <Typography
                color="text.secondary"
                style={{ marginBottom: "4px", color: "#66ff99" }}
              >
                MRP: {product.mrp}
              </Typography>
            </div>
          </div>
          {boxBase ? (
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
                  label={"UnitBoxQuantity"}
                  inputProps={{
                    value: product.unitBoxQuantity,
                    variant: "outlined",
                    type: "number",
                    className: "w-36",
                    disabled: true,
                  }}
                  style={{ marginBottom: "8px" }}
                />
              </div>
            </div>
          ) : (
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
                    value: product.requiredQuantity,
                    variant: "outlined",
                    type: "number",
                    className: "w-36",
                    disabled: true,
                  }}
                  style={{ marginBottom: "8px" }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </label>
  );
};

export default PreviewCard;
