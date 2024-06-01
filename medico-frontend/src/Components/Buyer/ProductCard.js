// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
// } from "@mui/material";

// const ProductCard = ({ product, addToCart }) => {
//   return (
//     <Card className="m-2" sx={{ maxWidth: 345 }}>
//       <CardMedia
//         component="img"
//         alt={product.drugName}
//         height="140"
//         image={product.photoUrl}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {product.drugName}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {product.contents}
//         </Typography>
//         <Typography variant="h6" color="text.primary">
//           Price: ${product.sellingPrice}
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={() => addToCart(product)}
//           className="mt-2"
//         >
//           Buy
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card className="m-2" sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={product.drugName}
        height="140"
        image={product.photoUrl}
      />
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => addToCart(product)}
          className="mt-2"
        >
          Buy
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
