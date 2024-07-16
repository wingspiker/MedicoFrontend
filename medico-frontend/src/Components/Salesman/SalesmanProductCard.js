import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const SalesmanProductCard = ({ product }) => {
  return (
    <div className="container px-4 py-4 mx-16">
      <div className="flex flex-col lg:flex-row">
        <Card className="m-2 relative" sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={product.drugName}
            height="140"
            image={product.photoUrl}
          />
          <div className="absolute top-0 right-0 bg-blue-500 text-white p-2 text-xs uppercase font-bold rounded-bl-lg">
            {product.manufacturerName}
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.drugName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.contents && product.contents.length > 50
                ? product.contents.substring(0, 40) + "..."
                : product.contents}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Price: ₹ {product.sellingPrice}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesmanProductCard;
