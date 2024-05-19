import React, { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { decodeToken, signOut } from "../../Services/auth";

import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { deleteOfferbyId, getOffers } from "../../Services/offer";

export default function AdminOffers() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const onlogout = () => {
    signOut();
    navigate("/admin");
  };

  const onAddOffer = () => {
    navigate("/admin/Offers/add");
  };

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getOffers(email)
      .then((res) => {
        setOffers(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleView = (id, index) => {
    navigate(`/admin/Offers/${index}`, { state: { id } });
  };

  const handleDeleteClick = (offerId) => {
    // console.log(offerId);
    setSelectedOffer(offerId);
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteOfferbyId(selectedOffer)
      .then(() => {
        setOffers(offers.filter((offer) => offer.id !== selectedOffer));
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className=" p-5 flex justify-between ms-12">
        <h1 className="text-3xl font-semibold text-white">Offers </h1>
        <button
          onClick={onAddOffer}
          className="  cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2"
        >
          Add Offers
        </button>
      </div>
      <hr />
      <AdminSidebar changeLogin={onlogout} />

      <div className=" ms-14 p-4">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto no-scrollbar">
              {offers.map((offer, index) => (
                <Card key={offer.id} className="min-h-40 rounded-2xl">
                  <img
                    src={offer.offerPhoto}
                    alt={offer.offerName}
                    style={{
                      height: "350px",
                      width: "90%",
                      margin: "auto",
                      borderRadius: "16px",
                      marginTop: "0.5rem"
                    }}
                  />
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
                    <div className="flex justify-between">
                      <Button
                        onClick={() => handleView(offer.id, index)}
                        variant="contained"
                        color="primary"
                        sx={{
                          bgcolor: "blue.300",
                          marginTop: '1rem',
                          "&:hover": {
                            bgcolor: "blue.500",
                          },
                        }}
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(offer.id)}
                        variant="contained"
                        color="error"
                        sx={{
                          bgcolor: "red.500",
                          marginTop: '1rem',
                          "&:hover": {
                            bgcolor: "red.700",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
    </>
  );
}
