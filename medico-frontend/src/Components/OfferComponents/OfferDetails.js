import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOfferById } from "../../Services/offer";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
  Divider,
  Chip,
  Grid,
  Box,
} from "@mui/material";
import { AccessTime, Person } from "@mui/icons-material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { priceCentricOfferSubTypeEnum } from "../../Models/enums.model";

const ProductCard = (props) => {
  const { p, qty } = props;
  return (
    <Card sx={{ maxWidth: 345, padding: "8px" }}>
      <CardHeader title={p.drugName} subheader={p.brandName} />
      {/* {console.log(p.photoUrl)} */}
      <CardMedia
        component="img"
        image={p.photoUrl}
        alt={p.drugName}
        style={{ height: "100px" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {p.manufacturerName}
        </Typography>
        <Typography variant="body2" color="text.primary">
          MRP : <span className=" text-green-500 font-bold">₹ {p.mrp}</span>
        </Typography>
        <Typography variant="body2" color="text.primary">
          Dimension :
          <span className=" ms-2">
            X : <span className=" font-bold">{p.packSize.x}</span>{" "}
          </span>
          <span className="ms-2">
            Y : <span className=" font-bold">{p.packSize.y}</span>{" "}
          </span>
        </Typography>
        {qty && <Typography variant="body2" color="text.primary">
          Required Quantity :
          <span className=" ms-2">
            {qty}
          </span>
        </Typography>}
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions> */}
    </Card>
  );
};

const ArticleCard = (props) => {
  const { p, qty } = props;
  return (
    <Card sx={{ maxWidth: 345, padding: "8px" }}>
      <CardHeader title={p.drugName} subheader={p.brandName} />
      {/* {console.log(p.photoUrl)} */}
      <CardMedia
        component="img"
        image={p.photoUrl}
        alt={p.drugName}
        style={{ height: "100px" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {p.manufacturerName}
        </Typography>
        <Typography variant="body2" color="text.primary">
          MRP : <span className=" text-green-500 font-bold">₹ {p.mrp}</span>
        </Typography>
        <Typography variant="body2" color="text.primary">
          Dimension :
          <span className=" ms-2">
            X : <span className=" font-bold">{p.packSize.x}</span>{" "}
          </span>
          <span className="ms-2">
            Y : <span className=" font-bold">{p.packSize.y}</span>{" "}
          </span>
        </Typography>
        <Typography variant="body2" color="text.primary">
          Required Quantity :
          <span className=" ms-2">
            {qty}
          </span>
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions> */}
    </Card>
  );
};

export default function OfferDetails(props) {
  const { changeLogin } = props;
  const location = useLocation();
  const [currOffer, setCurrOffer] = useState(null);
  const offerId = location?.state?.oid;

  useEffect(() => {
    getOfferById(offerId)
      .then((r) => {
        setCurrOffer(r);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offerId]);

  const renderOfferDetails = (offer) => {
    return (
      <div className=" h-[93vh] overflow-hidden no-scrollbar">
        {/* {console.log(offer)} */}
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  height="140"
                  image={offer.offerPhoto}
                  alt={offer.offerName}
                />
                <Typography variant="h5" component="div" mt={2}>
                  {offer.offerName}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {offer.offerDescription}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "fit-content",
                  }}
                >
                  <Chip
                    icon={<AccessTime />}
                    label={`Expiry: ${new Date(
                      offer.expiryDate
                    ).toLocaleDateString()}`}
                  />
                  <Chip
                    icon={<LocalOfferIcon />}
                    label={`Coupon Code: ${offer.offerCode}`}
                  />
                  <Chip
                    icon={<Person />}
                    label={`Allowed Users: ${offer.allowedUsers.join(", ")}`}
                  />
                </Box>
              </Grid>
              <Grid item xs={8} className="h-[92vh] overflow-auto no-scrollbar">
                {offer.priceCentricOffer && (
                  <div className=" ms-8">
                    <Typography variant="h4">Price Centric Offer</Typography>
                    <hr className=" my-2"/>
                    <Typography variant="h6" color="text.secondary">
                      SubType:{" "}
                      {priceCentricOfferSubTypeEnum[Object.keys(priceCentricOfferSubTypeEnum)[offer.priceCentricOffer.priceCentricOfferSubType]]}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Amount: {offer.priceCentricOffer.amount}
                    </Typography>
                    {offer.priceCentricOffer.orderHistory && (
                      <div className=" mt-4">
                        <Typography variant="h5">Order History</Typography>
                        <Typography variant="h6" color="text.secondary">
                          Starting Date:{" "}
                          {new Date(
                            offer.priceCentricOffer.orderHistory.startingDate
                          ).toLocaleDateString()}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Last Date:{" "}
                          {new Date(
                            offer.priceCentricOffer.orderHistory.lastDate
                          ).toLocaleDateString()}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          History Amount:{" "}
                          {offer.priceCentricOffer.orderHistory.historyAmount}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Amount: ₹ {Number(offer.priceCentricOffer.orderHistory.amount).toFixed(2)}
                        </Typography>
                      </div>
                    )}
                  </div>
                )}
                {offer.productCentricOffer && (
                  <div className=" ms-8">
                    <Typography variant="h4">Product Centric Offer</Typography>
                    <hr className=" my-2"></hr>
                    {offer.productCentricOffer.conditions.map(
                      (condition, index) => (
                        <div key={condition.id} className=" mt-6 mb-4">
                          <Typography variant="h5">
                            Condition {index + 1}
                          </Typography>
                          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {condition.productOffers.map((productOffer) => (
                              // <Typography
                              //   variant="body2"
                              //   color="text.secondary"
                              //   key={productOffer.id}
                              // >
                              //   Product ID: {productOffer.productId} - Required
                              //   Quantity: {productOffer.requiredQuantity}
                              // </Typography>
                              <ProductCard p={productOffer.productDetails} qty={productOffer.requiredQuantity} />
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
                {offer.boxBaseOffer && (
                  <div>
                    <Typography variant="h4">Box Base Offer</Typography>
                    <hr className=" my-2"/>
                    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {offer.boxBaseOffer.boxBaseOfferProducts.map((product) => (
                      // <Typography
                      //   variant="body2"
                      //   color="text.secondary"
                      //   key={product.id}
                      // >
                      //   Product ID: {product.productId} - Unit Box Quantity:{" "}
                      //   {product.unitBoxQuantity}
                      // </Typography>
                      <ProductCard p={product.productDetails} qty={product.unitBoxQuantity} />
                    ))}
                    </div>
                  </div>
                )}
                {offer.discountOffer && (
                  <div className=" ms-6 mt-6">
                    <Typography variant="h4">Discount Offer</Typography>
                    <hr className=" my-2"/>
                    <Typography variant="h6" color="text.secondary">
                      Discount Percentage:{" "}
                      {offer.discountOffer.discountPercentage}%
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Maximum Discount: {offer.discountOffer.maximumDiscount}
                    </Typography>
                  </div>
                )}
                {offer.freeGoodsOffer && (
                  <div className=" mt-6">
                    <Typography variant="h4">Free Goods Offer</Typography>
                    <hr className=" mt-2"></hr>
                    {offer.freeGoodsOffer.articleOptions.map(
                      (option, index) => (
                        <div key={option.id}>
                          
                          <Typography variant="h6">
                            Option {index + 1}
                          </Typography>
                          {option.articleWithQuantities.map((article) => (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              key={article.id}
                            >
                              Article ID: {article.articleId} - Quantity:{" "}
                              {article.quantity}
                            </Typography>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}
                {offer.freeProductsOffer && (
                  <div className=" ms-6 mt-8">
                    <Typography variant="h4">Free Products Offer</Typography>
                    <hr className=" mt-2"></hr>
                    {offer.freeProductsOffer.productOptions.map(
                      (option, index) => (
                        <div key={option.id} className=" mt-6 mb-4">
                          <Typography variant="h6">
                            Option {index + 1}
                          </Typography>
                          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {option.productWithQuantities.map((product) => (
                            // <Typography
                            //   variant="body2"
                            //   color="text.secondary"
                            //   key={product.id}
                            // >
                            //   Product ID: {product.productId} - Quantity:{" "}
                            //   {product.quantity}
                            // </Typography>

                            <ProductCard p={product.productDetails} qty={product.quantity}/>
                          ))}</div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex-1 ms-14">
      {currOffer && (
        <>
          <div className="p-2 flex justify-start gap-4 h-14">
            <p className="text-3xl text-white">
              Offer Detail - {currOffer.offerName}
            </p>
          </div>
          <hr />
          <div>{renderOfferDetails(currOffer)}</div>
        </>
      )}
    </div>
  );
}
