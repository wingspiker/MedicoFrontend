import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken, signOut } from "../../../Services/auth";
import { Sidebar } from "../Sidebar";
import { getOffers } from "../../../Services/offer";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function Offer(props) {
  const navigate = useNavigate();
  const { changeLogin } = props;
  const [offers, setOffers] = useState([]);

  const onAddOffer = () => {
    navigate("/admin/Offers/add");
  };

  const logout = () => {
    signOut();
    changeLogin(false);
  };

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getOffers(email)
      .then((res) => {
        // console.log(res);
        setOffers(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex h-screen  bg-cyan-900 text-white">
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end">
            <button
              onClick={onAddOffer}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Offer
            </button>
          </div>
          <hr />
          <div className=" p-4">
            <p className=" mb-4 text-3xl text-white">Offers</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-[90vh] overflow-y-auto no-scrollbar">
              {offers.map((offer) => (
                <Card key={offer.id} className=" min-h-40">
                  <img src={offer.offerPhoto} alt={offer.offerName} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {offer.offerName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {offer.offerDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Expires: {new Date(offer.expiryDate).toDateString()}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                    Price: ${offer.priceCentricOffer?.amount / 100}
                  </Typography> */}
                    {/* <Button variant="contained" color="primary">
                    View Offer
                  </Button> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
