import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Checkbox } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomInput } from "./Input";

const ProductCard = ({ product, boxBase }) => {
  const { register, setValue, watch, errors } = useFormContext();
  const watchSelectedProducts = watch("selectedProducts") || [];
  const checked = watchSelectedProducts.some(
    (selectedProduct) => selectedProduct?.productId === product?.id
  );
  const [expanded, setExpanded] = useState(checked);

  useEffect(() => {
    if (!watchSelectedProducts[product.id]) return;
    const { sizeX, sizeY, quantity } = watchSelectedProducts[product.id];
    if (!sizeX || !sizeY || !quantity) return;
    const unitBoxQuantity = +sizeX * +sizeY * +quantity;
    setValue(`selectedProducts.${product.id}.unitBoxQuantity`, unitBoxQuantity);
  }, [watchSelectedProducts, product, setValue]);

  const handleCheckboxChange = (event) => {
    const updatedSelectedProducts = [...watchSelectedProducts];
    if (event.target.checked) {
      if (boxBase)
        updatedSelectedProducts.push({
          productId: product.id,
          sizeX: product?.packSize?.x,
          sizeY: "",
          quantity: "",
          unitBoxQuantity: 0,
        });
      else
        updatedSelectedProducts.push({
          productId: product.id,
        });
      setExpanded(true);
    } else {
      const index = updatedSelectedProducts.findIndex(
        (selectedProducts) => selectedProducts.productId === product.id
      );
      updatedSelectedProducts.splice(index, 1);
      setExpanded(false);
    }
    setValue("selectedProducts", updatedSelectedProducts);
  };

  const handleInputChange = (event, field, index) => {
    const value = parseFloat(event.target.value);
    const updatedSelectedProducts = [...watchSelectedProducts];
    updatedSelectedProducts[index] = {
      ...updatedSelectedProducts[index],
      [field]: isNaN(value) ? "" : value,
    };
    setValue("selectedProducts", updatedSelectedProducts);
  };

  return (
    <label htmlFor={`checkbox-${product.id}`} style={{ cursor: "pointer" }}>
      <Card
        variant="outlined"
        
        style={{
          marginBottom: "16px",
          background: "#ffffff",
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
              // marginBottom: "16px",
            }}
          >
            <Checkbox
              id={`checkbox-${product.id}`}
              checked={checked}
              onChange={handleCheckboxChange}
              
              // style={{ color: "rgb(22 78 99)", marginRight: "16px" }}
            />
            <Typography
              variant="h5"
              component="div"
              className=" text-red-500 font-extralight"
              style={{ letterSpacing:'0.125em'}}
            >
              {product.drugName}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // marginBottom: "16px",
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
                style={{ marginBottom: "4px", color: "#000000" }}
              >
                Brand: {product.brandName}
              </Typography>
              <Typography
                color="text.secondary"
                style={{ marginBottom: "4px", color: "#000000" }}
              >
                Manufacturing Name: {product.manufacturingName}
              </Typography>
              <Typography
                color="text.secondary"
                style={{ marginBottom: "4px", color: "#000000" }}
              >
                Manufacturer Name: {product.manufacturerName}
              </Typography>
              <Typography
                color="text.secondary"
                style={{ marginBottom: "4px", color: "#000000" }}
              >
                MRP:  ₹ {Number(product.mrp).toPrecision(String(product.mrp).length+2)} /-
              </Typography>
            </div>
          </div>
          {boxBase ? (
            <div className="h-[90px]">
              {expanded &&
                watchSelectedProducts.map((selectedProduct, index) => (
                  <div key={index}>
                    {selectedProduct.productId === product.id && (
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
                          label={"Size X"}
                          inputProps={{
                            defaultValue: product.packSize.x,
                            disabled: true,
                            variant: "outlined",
                            className: "!w-36",
                          }}
                          style={{ marginBottom: "8px" }}
                        />
                        <CustomInput
                          label={"Size Y"}
                          inputProps={{
                            ...register(`selectedProducts[${index}].sizeY`, {
                              required: "Size Y is required",
                            }),
                            variant: "outlined",
                            type: "number",
                            onChange: (e) =>
                              handleInputChange(e, "sizeY", index),
                            className: "!w-36",
                          }}
                          error={errors?.selectedProducts?.[index]?.sizeY}
                          style={{ marginBottom: "8px" }}
                        />
                        <CustomInput
                          label={"Quantity"}
                          inputProps={{
                            ...register(`selectedProducts[${index}].quantity`, {
                              required: "Quantity is required",
                            }),
                            variant: "outlined",
                            type: "number",
                            onChange: (e) =>
                              handleInputChange(e, "quantity", index),
                            className: "!w-36",
                          }}
                          error={errors?.selectedProducts?.[index]?.quantity}
                          style={{ marginBottom: "8px" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className="h-[90px]">
              {expanded &&
                watchSelectedProducts.map((selectedProduct, index) => (
                  <div key={index}>
                    {selectedProduct.productId === product.id && (
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
                              `selectedProducts[${index}].requiredQuantity`,
                              {
                                required: "Quantity is required",
                              }
                            ),
                            variant: "outlined",
                            type: "number",
                            onChange: (e) =>
                              handleInputChange(e, "requiredQuantity", index),
                            className: "!w-36",
                          }}
                          error={
                            errors?.selectedProducts?.[index]?.requiredQuantity
                          }
                          style={{ marginBottom: "8px" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </label>
  );
};

export default ProductCard;
