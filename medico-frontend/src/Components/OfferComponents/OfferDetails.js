import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOfferById } from "../../Services/offer";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Chip,
  Grid,
  Box
} from "@mui/material";
import { AccessTime, Person  } from "@mui/icons-material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function OfferDetails(props) {
  const { changeLogin } = props;
  const location = useLocation();
  const [currOffer, setCurrOffer] = useState(null);
  const offerId = location?.state?.id;

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
      <div>
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
                
                <Box  sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 'fit-content'  }}>
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
              <Grid item xs={8}>
                {offer.priceCentricOffer && (
                  <div>
                    <Typography variant="h6">Price Centric Offer</Typography>
                    <Typography variant="body2" color="text.secondary">
                      SubType: {offer.priceCentricOffer.priceCentricOfferSubType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Amount: {offer.priceCentricOffer.amount}
                    </Typography>
                    {offer.priceCentricOffer.orderHistory && (
                      <div>
                        <Typography variant="h6">Order History</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Starting Date:{" "}
                          {new Date(
                            offer.priceCentricOffer.orderHistory.startingDate
                          ).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Last Date:{" "}
                          {new Date(
                            offer.priceCentricOffer.orderHistory.lastDate
                          ).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          History Amount:{" "}
                          {offer.priceCentricOffer.orderHistory.historyAmount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Amount: {offer.priceCentricOffer.orderHistory.amount}
                        </Typography>
                      </div>
                    )}
                  </div>
                )}
                {offer.productCentricOffer && (
                  <div>
                    <Typography variant="h6">Product Centric Offer</Typography>
                    {offer.productCentricOffer.conditions.map(
                      (condition, index) => (
                        <div key={condition.id}>
                          <Typography variant="h6">
                            Condition {index + 1}
                          </Typography>
                          {condition.productOffers.map((productOffer) => (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              key={productOffer.id}
                            >
                              Product ID: {productOffer.productId} - Required
                              Quantity: {productOffer.requiredQuantity}
                            </Typography>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}
                {offer.boxBaseOffer && (
                  <div>
                    <Typography variant="h6">Box Base Offer</Typography>
                    {offer.boxBaseOffer.boxBaseOfferProducts.map((product) => (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        key={product.id}
                      >
                        Product ID: {product.productId} - Unit Box Quantity:{" "}
                        {product.unitBoxQuantity}
                      </Typography>
                    ))}
                  </div>
                )}
                {offer.discountOffer && (
                  <div>
                    <Typography variant="h6">Discount Offer</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Discount Percentage: {offer.discountOffer.discountPercentage}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Maximum Discount: {offer.discountOffer.maximumDiscount}
                    </Typography>
                  </div>
                )}
                {offer.freeGoodsOffer && (
                  <div>
                    <Typography variant="h6">Free Goods Offer</Typography>
                    {offer.freeGoodsOffer.articleOptions.map((option, index) => (
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
                    ))}
                  </div>
                )}
                {offer.freeProductsOffer && (
                  <div>
                    <Typography variant="h6">Free Products Offer</Typography>
                    {offer.freeProductsOffer.productOptions.map((option, index) => (
                      <div key={option.id}>
                        <Typography variant="h6">
                          Option {index + 1}
                        </Typography>
                        {option.productWithQuantities.map((product) => (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            key={product.id}
                          >
                            Product ID: {product.productId} - Quantity:{" "}
                            {product.quantity}
                          </Typography>
                        ))}
                      </div>
                    ))}
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
