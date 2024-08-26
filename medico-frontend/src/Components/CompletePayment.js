import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { decodeToken, signOut } from "../Services/auth";
import {
  changeChargesType,
  getCurrentPlanDetails,
  getDuePayment,
  getMonthlyTurnOver,
  getPaymentError,
  getUserByEmail,
  payDue,
} from "../Services/user";
import { handleImageUpload } from "../Services/upload";
import { subscriptionTypeEnum } from "../Models/enums.model";
import { CircularProgress, Typography } from "@mui/material";
import { toast, Toaster } from "sonner";
import BillComponent from "./BillComponent";

export default function CompletePayment(props) {
  const { changeLogin } = props;
  const logout = () => {
    signOut();
    changeLogin(false);
  };
  // const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState("");

  const [red, isRed] = useState(true);

  const [showChargeModal, setChargeModal] = useState(false);
  const [charge, setCharge] = useState(-1);

  useEffect(() => {
    // setCharge(currChargeType);
    if (user) {
      const user = decodeToken();
      const keys = Object.keys(user);
      const email = user[keys.find((k) => k.endsWith("emailaddress"))];
      getPaymentError(email)
        .then((resp) => {
          setCharge(resp.chargesType);
          setMessage(resp.reason);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newPayment, setNewPayment] = useState(0);
  const [newBillPayment, setNewBillPayment] = useState(0);
  const [paymentProof, setPaymentProof] = useState("");
  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState(false);

  const plans = [
    { id: 0, name: "Monthly Plan", price: "₹ 3000/month" },
    { id: 1, name: "Six Months Plan", price: "₹ 15,000/six months" },
    { id: 2, name: "Annual Plan", price: "₹ 25,000 Annually" },
  ];

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getUserByEmail(email)
      .then((resp) => {
        setUser(resp);
        if (resp.company.charges === "Subscription") {
          getCurrentPlanDetails(email)
            .then((resp) => {
              setSubscription(resp);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [fl, setFl] = useState(true);

  const handleSave = () => {
    if (selectedPlan) {
      // handle payment logic here
      const user = decodeToken();
      const keys = Object.keys(user);
      const email = user[keys.find((k) => k.endsWith("emailaddress"))];
      const rup = newPayment;
      const payment = {
        paidAmount: rup,
        photoUrl: paymentProof,
      };

      payDue(email, selectedPlan.id, payment)
        .then((resp) => {
          console.log(resp);
          setShowModal(false);
          getCurrentPlanDetails(email)
            .then((resp) => {
              // console.log("nrr");
              console.log(resp);
              setSubscription(resp);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          setShowModal(false);
        });
    }
  };

  useEffect(() => {
    if (charge === 1) {
      const user = decodeToken();
      const keys = Object.keys(user);
      const email = user[keys.find((k) => k.endsWith("emailaddress"))];
      getMonthlyTurnOver(email)
        .then((resp) => {
          const b = resp;
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          // Sorting by year and month in descending order
          b.sort((a, b) => {
            if (a.year !== b.year) {
              return b.year - a.year;
            }
            return b.month - a.month;
          });

          // Filtering by payment status and mapping to add monthName
          const result = b.map((item) => ({
            ...item,
            monthName: monthNames[item.month - 1],
          }));

          setBill(result);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [charge, fl]);

  const onPlanSelect = (subId) => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    checkSwitchPossibility(0, subId);
    getDuePayment(email, subId)
      .then((resp) => {
        console.log(resp);
        setNewPayment(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePaymentDetailChange = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      // setPaymentDetail(file);
      handleImageUpload(e)
        .then((resp) => {
          setPaymentProof(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    setLoading(false);
  };

  const reload = () => {
    //reload logic here
    setFl((f) => !f);
  };

  const checkSwitchPossibility = (chargesType, planType) => {
    setLoading(true);
    const user = decodeToken();
    const keys = Object.keys(user);
    const companyEmail = user[keys.find((k) => k.endsWith("emailaddress"))];
    const changeObj = {
      companyEmail,
      chargesType,
      subscriptionPlanType: selectedPlan?.id ?? -1,
    };
    changeChargesType(changeObj)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        setChargeModal(false);
        isRed(false);
        toast.success("Your request to change chargetype has been submitted");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setChargeModal(false);
        setSelectedPlan(null);
        toast.error(err.response.data.detail);
      });
  };

  return (
    <>
      <div className="flex justify-between bg-cyan-900 px-4 py-2">
        <h1 className="text-xl font-bold text-white">
          Subscription Management
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="flex items-center h-[80vh] justify-center bg-cyan-900">
        <Toaster
          position="top-center"
          toastOptions={{
            style: { color: `${red ? "red" : "green"}` },
          }}
        />
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold mb-4 text-center">
            {console.log(user)}
            Payment Pending
          </h1>
          {user?.company?.isChargeTypeChangeInProgress === false ? (
            <>
              <p className="text-gray-700 mb-4">{message}</p>

              <div className="flex justify-center">
                {charge === 0 && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 me-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Renew Subscription
                  </button>
                )}
                {charge === 1 && (
                  <button
                    onClick={() => setShowModal(true)}
                    disabled={charge === -1}
                    className="bg-blue-500 me-2 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Pay Bill
                  </button>
                )}
                <button
                  onClick={() => setChargeModal(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                >
                  Switch Chargetype
                </button>
              </div>
            </>
          ):<h2>Your payment request is not verified. please wait for verification</h2>}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal p-6 bg-white rounded-md shadow-lg w-full md:w-1/2 mx-auto"
        overlayClassName="modal-overlay fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
        contentLabel="Select a Plan"
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>

        {/* Modal content */}
        <h2 className="text-lg font-bold mb-4">
          {charge === 0 && (
            <Typography variant="h5" className="mb-4">
              Select a Plan
            </Typography>
          )}
          {charge === 1 && (
            <Typography variant="h5" className="mb-4">
              Monthly Bill Details
            </Typography>
          )}
        </h2>
        {charge === 0 && (
          <div className="flex gap-4 justify-between w-full">
            {subscription && subscription.currentSubscriptionPlan === 2 && (
              <p>No Plan Available to Upgrade</p>
            )}
            {subscription &&
              plans.map((plan) => {
                if (plan.id >= subscription.currentSubscriptionPlan)
                  return (
                    <div
                      key={plan.id}
                      className={`flex-1 ${
                        selectedPlan !== null && selectedPlan.id === plan.id
                          ? "bg-cyan-200"
                          : "bg-gray-100"
                      } bg-gray-100 rounded-md p-4 flex flex-col justify-between`}
                    >
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className="text-gray-600 min-h-16">{plan.price}</p>
                      <button
                        className="mt-2 px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
                        onClick={() => {
                          setSelectedPlan(plan);
                          onPlanSelect(plan.id);
                        }}
                      >
                        {selectedPlan !== null && selectedPlan.id === plan.id
                          ? "Selected"
                          : "Select"}
                      </button>
                    </div>
                  );
                else return <></>;
              })}
          </div>
        )}

        {charge === 1 && (
          <div className="flex gap-4 justify-between">
            <BillComponent bills={bill} reload={reload} />
          </div>
        )}

        {newPayment > 0 && (
          <p className="mt-4 text-green-600 font-semibold">
            You need to pay ₹ {newPayment} to Upgrade to{" "}
            {Object.values(subscriptionTypeEnum)[selectedPlan?.id]}.
          </p>
        )}
        {newPayment > 0 && (
          <label className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer inline-block transition-colors duration-300 ease-in-out">
            {loading ? (
              <CircularProgress />
            ) : paymentProof.length > 0 ? (
              "Uploaded"
            ) : (
              "Upload Payment Proof"
            )}
            <input
              type="file"
              className="hidden"
              aria-hidden="true"
              tabIndex="-1"
              onChange={handlePaymentDetailChange}
            />
          </label>
        )}

        {/* Footer buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          {charge === 0 && (
            <button
              className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
              onClick={handleSave}
            >
              {selectedPlan ? "Confirm and save" : "Save"}
            </button>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={showChargeModal}
        onRequestClose={() => setChargeModal(false)}
        className="modal p-6 bg-white rounded-md shadow-lg w-full md:w-1/2 mx-auto"
        overlayClassName="modal-overlay fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
        // contentLabel="Select a Plan"
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
          onClick={() => setChargeModal(false)}
        >
          &times;
        </button>

        {/* Modal content */}
        <h2 className="text-lg font-bold mb-4">
          Are you sure You want to change charge type to{" "}
          {charge === 0 && "Percentage"} {charge === 1 && "Subscription"} ?
        </h2>
        <div className="flex gap-4 justify-between">
          {charge === 1 &&
            plans.map((plan) => {
              return (
                <div
                  key={plan.id}
                  className={`flex-1 ${
                    selectedPlan !== null && selectedPlan.id === plan.id
                      ? "bg-cyan-200"
                      : "bg-gray-100"
                  } bg-gray-100 rounded-md p-4 flex flex-col justify-between`}
                >
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-gray-600 min-h-16">{plan.price}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
                    onClick={() => {
                      onPlanSelect(plan.id);
                      setSelectedPlan(plan);
                    }}
                  >
                    {selectedPlan !== null && selectedPlan.id === plan.id
                      ? "Selected"
                      : "Select"}
                  </button>
                </div>
              );
            })}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:bg-green-700"
            onClick={() => checkSwitchPossibility(+!charge)}
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              "Yes"
            )}
          </button>
          <button
            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => setChargeModal(false)}
          >
            Cancel
          </button>
          {/* <button
                      className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
                      onClick={handleSave}
                    >
                      {selectedPlan ? "Confirm and save" : "Save"}
                    </button> */}
        </div>
      </Modal>
    </>
  );
}
