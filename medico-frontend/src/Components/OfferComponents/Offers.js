import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken, signOut } from "../../Services/auth";
import { Sidebar } from "../SafeComponents/Sidebar";
import { getOffers, deleteOfferbyId } from "../../Services/offer";
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function Offer(props) {
  const navigate = useNavigate();
  const { changeLogin } = props;
  const [offers, setOffers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const onAddOffer = () => {
    navigate("/company/Offer/add");
  };

  const logout = () => {
    signOut();
    changeLogin(false);
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
    navigate(`/company/Offer/${index}`, { state: { id } });
  };

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className="p-2 flex justify-end">
            <button
              onClick={onAddOffer}
              className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Offer
            </button>
          </div>
          <hr />
          <div className="p-4">
            <p className="mb-4 text-3xl text-white">Offers</p>

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
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Delete Offer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this offer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false); setSelectedOffer(null);}} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
