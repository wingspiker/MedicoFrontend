import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card className="m-2 relative" sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={product.drugName}
        height="140"
        image={product.photoUrl}
      />
      <div className="absolute top-0 right-0 bg-blue-500 text-white p-2 text-xs uppercase font-bold rounded-bl-lg">
        {product.manufacturerName}{" "}
        {/* Example condition, adjust according to your data */}
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.drugName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.contents}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Price: ${product.sellingPrice}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
