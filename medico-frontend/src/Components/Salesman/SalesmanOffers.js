import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../Services/auth";
import { getSalesmanOffersByEmail } from "../../Services/salesman";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

export default function SalesmanOffers() {
  const [currOffers, setCurrOffers] = useState(null);

  const navigate = useNavigate();

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    getSalesmanOffersByEmail(email)
      .then((resp) => {
        console.log(resp);
        setCurrOffers(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onViewProduct = (oid, index) => {
    console.log(oid, index);
    navigate(`/sales/Offers/${index}`, { state: { oid } });
  };

  return (
    <div className="flex-1 ms-14">
      <h2 className="text-3xl font-semibold text-white my-2 mb-3 mx-3 p-1">
        Available Offers
      </h2>
      <hr />
      <div className="p-5">
        <div className="grid grid-cols-4 gap-4">
          {
            currOffers?.map((offer, index) => (
              <Card key={offer.id} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={offer.offerPhoto}
                  alt={offer.offerName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {offer.offerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {offer.offerDescription}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => onViewProduct(offer.id, index)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
