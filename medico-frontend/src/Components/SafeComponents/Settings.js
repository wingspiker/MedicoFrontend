import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
// import { useNavigate } from "react-router-dom";
import { decodeToken, signOut } from "../../Services/auth";
import {
  changeChargesType,
  getCurrentPlanDetails,
  getDuePayment,
  getMonthlyTurnOver,
  getPaymentError,
  getUserByEmail,
  payDue,
} from "../../Services/user";
import { subscriptionTypeEnum } from "../../Models/enums.model";
import Modal from "react-modal";
import { handleImageUpload } from "../../Services/upload";
import { CircularProgress } from "@mui/material";
import BillComponent from "../BillComponent";
import { toast, Toaster } from "sonner";

export default function Settings(props) {
  const { changeLogin } = props;
  const logout = () => {
    signOut();
    changeLogin(false);
  };

  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [charge, setCharge] = useState(null);
  const [bill, setBill] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showChargeModal, setChargeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newPayment, setNewPayment] = useState(0);
  const [paymentProof, setPaymentProof] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [red, setRed] = useState(false);

  const reload = () => {
    setFlag((f) => !f);
  };

  useEffect(() => {
    // setCharge(currChargeType);
    if (user) {
      const usr = decodeToken();
      const keys = Object.keys(usr);
      const email = usr[keys.find((k) => k.endsWith("emailaddress"))];
      getPaymentError(email)
        .then((resp) => {
          // console.log(resp);
          resp.chargesType && setCharge(resp.chargesType);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(user);
      if (user?.company?.charges === "Percentage") {
        console.log("heree");
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
          })
          .catch((err) => console.log(err));
      }
    }
  }, [user, flag]);

  useEffect(() => {
    if (user) {
      const chr = +(user?.company?.charges === "Percentage");
      setCharge(chr);
    }
  }, [user]);

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

  const onPlanSelect = (subId) => {
    console.log("kk");
    // checkSwitchPossibility(0,subId)
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getDuePayment(email, subId)
      .then((resp) => {
        console.log(resp);
        setNewPayment(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const plans = [
    { id: 0, name: "Monthly Plan", price: "₹ 3000/month" },
    { id: 1, name: "Six Months Plan", price: "₹ 15,000/six months" },
    { id: 2, name: "Annual Plan", price: "₹ 25,000 Annually" },
  ];

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
          setChargeModal(false);
          getCurrentPlanDetails(email)
            .then((resp) => {
              console.log("nrr");
              console.log(resp);
              setSubscription(resp);
              setRed(false);
              toast.success(
                "Your request to change Charge Type has been sent successfully."
              );
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          setShowModal(false);
          setChargeModal(false);
        });
    }
  };

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getUserByEmail(email)
      .then((resp) => {
        console.log(resp);
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

  const getCurrBill = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0 for January, so we add 1
    const currBill = bill.find(
      (b) => b.year === currentYear && b.month === currentMonth
    );
    return currBill;
  };

  const checkSwitchPossibility = (chargesType, planType) => {
    // setLoading(true);
    const user = decodeToken();
    const keys = Object.keys(user);
    const companyEmail = user[keys.find((k) => k.endsWith("emailaddress"))];
    const changeObj = {
      companyEmail,
      chargesType,
      subscriptionPlanType: planType,
    };
    console.log(changeObj);
    changeChargesType(changeObj)
      .then((resp) => {
        console.log(resp);
        // setLoading(false);
        setChargeModal(true);
        setSelectedPlan(plans[0]);
        onPlanSelect(plans[0].id);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
        setChargeModal(false);
        setSelectedPlan(null);
        toast.error(err.response.data.detail);
      });
  };

  return (
    <div className="flex h-screen bg-white text-slate-700">
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className="p-2 flex justify-between gap-4">
            <h1 className="text-3xl font-semibold mb-1">Settings</h1>
          </div>
          <hr />
          <Toaster
            position="top-center"
            toastOptions={{
              style: { color: `${red ? "red" : "green"}` },
            }}
          />
          <div className="p-8">
            {user && (
              <div className="bg-cyan-100 text-cyan-900 p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Email Address:</p>
                    <p>{user.emailAddress}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone Number:</p>
                    <p>{user.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email Verified:</p>
                    <p>{user.isEmailVerified ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone Verified:</p>
                    <p>{user.isPhoneVerified ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Company Name:</p>
                    <p>{user.company.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Company Email:</p>
                    <p>{user.company.companyEmail}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Company Type:</p>
                    <p>{user.company.companyType}</p>
                  </div>
                  {user.company.companyType === "SelfSelling" && (
                    <div>
                      <p className="font-semibold">Charges:</p>
                      <p>{user.company.charges}</p>
                    </div>
                  )}
                  {console.log(user)}
                  {user.company.companyType === "SelfSelling" && (
                    <>
                      {user.company.charges === "Subscription" &&
                        subscription && (
                          <div className="col-span-2 mt-4">
                            <h2 className="text-xl font-bold">
                              Current Subscription Plan
                            </h2>
                            <div className="bg-cyan-800 p-4 rounded-lg mt-2">
                              <p>
                                <strong>Plan:</strong>{" "}
                                {
                                  Object.values(subscriptionTypeEnum)[
                                    subscription.currentSubscriptionPlan
                                  ]
                                }
                              </p>
                              <p>
                                <strong>Start Date:</strong>{" "}
                                {new Date(
                                  subscription.currentPlanStartDate
                                ).toLocaleDateString()}
                              </p>
                              <p>
                                <strong>Expiry Date:</strong>{" "}
                                {new Date(
                                  subscription.currentPlanExpiry
                                ).toLocaleDateString()}
                              </p>

                              {user.company.charges === "Percentage" && (
                                <p>
                                  <strong>Due Payment:</strong>{" "}
                                  {(getCurrBill()?.paymentAmount ?? 0).toFixed(
                                    2
                                  )}
                                  /-
                                  {subscription.duePayment
                                    ? `₹${subscription.lastDuePaymentAmount}`
                                    : "No due payment"}
                                </p>
                              )}

                              {user?.company?.isChargeTypeChangeInProgress ? (
                                <p className=" text-yellow-500 font-medium">
                                  Your request to change chargetype to
                                  subscription is not verified. please wait for
                                  verification
                                </p>
                              ) : (
                                <button
                                  onClick={() => setShowModal(true)}
                                  className="px-4 mt-2 me-2 py-2 bg-[#3e9a6f] text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                >
                                  Change Plan
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      {/* {console.log(user.company.charges)} */}
                      {user.company.charges === "Percentage" && (
                        <div className="col-span-2 mt-4">
                          <h2 className="text-xl font-bold">Current Plan</h2>
                          <div className="bg-cyan-800 p-4 rounded-lg mt-2">
                            {user?.company?.isChargeTypeChangeInProgress ? (
                              <p className=" text-yellow-500 font-medium">
                                Your request to change chargetype to percentage
                                is not verified. please wait for verification
                              </p>
                            ) : (
                              <>
                                <p>
                                  <strong>Charges Type:</strong> Percentage
                                </p>

                                <p>
                                  <strong>Due Payment:</strong>{" "}
                                  {getCurrBill()?.paymentAmount ?? 0}/-
                                </p>
                                <button
                                  onClick={() => setShowModal(true)}
                                  className="px-4 mt-2 me-2 py-2 bg-[#3e9a6f] text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                >
                                  Pay Bill
                                </button>
                                <button
                                  onClick={() => {
                                    checkSwitchPossibility(+!charge, 0);
                                  }}
                                  className="px-4 mt-2 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                                >
                                  Switch Chargetype
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <CustomButton
                  className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
                  onClick={() => console.log("Reset Password Clicked")}
                >
                  Reset Password
                </CustomButton>

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
                  {/* {console.log(user)} */}
                  {user?.company?.charges === "Subscription" && (
                    <>
                      <h2 className="text-lg font-bold mb-4">Select a Plan</h2>
                      <div className="flex gap-4 justify-between">
                        {subscription &&
                          subscription.currentSubscriptionPlan === 2 && (
                            <p>No Plan Available to Upgrade</p>
                          )}
                        {/* {console.log('lll',subscription.currentSubscriptionPlan)} */}
                        {subscription &&
                          plans.map((plan) => {
                            if (plan.id > subscription.currentSubscriptionPlan)
                              return (
                                <div
                                  key={plan.id}
                                  className={`flex-1 ${
                                    selectedPlan !== null &&
                                    selectedPlan.id === plan.id
                                      ? "bg-cyan-200"
                                      : "bg-gray-100"
                                  } bg-gray-100 rounded-md p-4 flex flex-col justify-between`}
                                >
                                  <h3 className="text-lg font-semibold">
                                    {plan.name}
                                  </h3>
                                  <p className="text-gray-600 min-h-16">
                                    {plan.price}
                                  </p>
                                  <button
                                    className="mt-2 px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
                                    onClick={() => {
                                      setSelectedPlan(plan);
                                      onPlanSelect(plan.id);
                                    }}
                                  >
                                    {selectedPlan !== null &&
                                    selectedPlan.id === plan.id
                                      ? "Selected"
                                      : "Select"}
                                  </button>
                                </div>
                              );
                            return <></>;
                          })}
                      </div>
                      {newPayment > 0 && (
                        <p className="mt-4 text-green-600 font-semibold">
                          You need to pay ₹ {newPayment} to Upgrade to{" "}
                          {Object.values(subscriptionTypeEnum)[selectedPlan.id]}
                          .
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
                        <button
                          className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
                          onClick={handleSave}
                        >
                          {selectedPlan ? "Confirm and save" : "Save"}
                        </button>
                      </div>
                    </>
                  )}

                  {user?.company?.charges === "Percentage" && (
                    <>
                      {/* <p>Hello</p> */}

                      {bill.length > 0 ? (
                        <BillComponent bills={bill} reload={reload} />
                      ) : (
                        <>No Bills Generated Yet</>
                      )}
                    </>
                  )}
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
                    {charge === 0 && "Percentage"}{" "}
                    {charge === 1 && "Subscription"} ?
                  </h2>
                  <div className="flex gap-4 justify-between">
                    {plans.map((plan) => {
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
                            {selectedPlan !== null &&
                            selectedPlan.id === plan.id
                              ? "Selected"
                              : "Select"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {newPayment > 0 && (
                    <p className="mt-4 text-green-600 font-semibold">
                      You need to pay ₹ {newPayment} to Upgrade to{" "}
                      {Object.values(subscriptionTypeEnum)[selectedPlan.id]}.
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
                      onClick={() => setChargeModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
                      onClick={handleSave}
                    >
                      {selectedPlan ? "Confirm and save" : "Save"}
                    </button>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
