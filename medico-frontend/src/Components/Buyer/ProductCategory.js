import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ProductCategory({ category }) {
  return (
    <Card>
      {/* <img src={category.image} alt="" /> */}
      <CardMedia
        image={category.image}
        component="img"
        title={category.name}
        style={{ width: "200px", objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {category.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
