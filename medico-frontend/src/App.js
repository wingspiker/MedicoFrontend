import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import "./App.css";

// Components
import Register from "./Components/Register";
import Login from "./Components/Login";
import Welcome from "./Components/Welcome";
import Product from "./Components/SafeComponents/Product";
import AddProduct from "./Components/SafeComponents/AddProduct";
import {
  checkToken,
  decodeToken,
  formdata,
  isAdmin,
  isBuyer,
  isCompanyAdmin,
  isCompanySelf,
  isSalesman,
  setCurrStep,
  setFormData,
  signOut,
  token,
} from "./Services/auth";
import CompleteDetails from "./Components/CompleteDetails";
import AddOffer from "./Components/OfferComponents/AddOffer";
import Offer from "./Components/OfferComponents/Offers";
import { Sidebar } from "./Components/SafeComponents/Sidebar";
import Division from "./Components/SafeComponents/Division";
import Group from "./Components/SafeComponents/Group";
import Article from "./Components/SafeComponents/Article";
import AddGroup from "./Components/SafeComponents/AddGroup";
import AdminPage from "./Components/Admin/AdminPage";
import ProductDetails from "./Components/SafeComponents/ProductDetails";
import Salesman from "./Components/SafeComponents/Salesman";
import AdminLanding from "./Components/Admin/AdminLanding";
import AdminGroups from "./Components/Admin/AdminGroups";
import AdminArticles from "./Components/Admin/AdminArticles";
import AdminOffers from "./Components/Admin/AdminOffers";
import AdminAddGroup from "./Components/Admin/AdminAddGroups";
import AdminAddOffers from "./Components/Admin/AdminOfferComponents/AddOffer";
import AdminAddSalesman from "./Components/Admin/AdminAddSalesman";
import AdminProduct from "./Components/Admin/AdminProduct";
import AdminSellingProducts from "./Components/Admin/AdminProductComponents/AdminSellingProducts";
import Settings from "./Components/SafeComponents/Settings";
import AdminSettings from "./Components/Admin/AdminSettings";
import OfferDetails from "./Components/OfferComponents/OfferDetails";
import { AdminSidebar } from "./Components/Admin/AdminSidebar";
import SalesmanDetail from "./Components/SalesmanComponents/SalesmanDetail";
import PageNotFound from "./Components/PageNotFound";
import AdminCompanyVerify from "./Components/Admin/AdminAccountsComponents/AdminCompanyVerify";
import CompanyDetails from "./Components/Admin/AdminAccountsComponents/CompanyDetails";
import SalesmanLanding from "./Components/Salesman/SalesmanLanding";
import { SalesmanSidebar } from "./Components/Salesman/SalesmanSidebar";
import SalesmanProducts from "./Components/Salesman/SalesmanProducts";
import SalesmanCompany from "./Components/Salesman/SalesmanCompany";
import SalesmanSettings from "./Components/Salesman/SalesmanSettings";
import BuyerHome from "./Components/Buyer/BuyerHome";
import Home from "./Components/Home";
import SalesmanOffers from "./Components/Salesman/SalesmanOffers";
import BuyerListing from "./Components/Buyer/BuyerListing";
import BuyerProductDetails from "./Components/Buyer/BuyerProductDetails";
import BuyerCart from "./Components/Buyer/BuyerCart";
import BuyerApplyOffer from "./Components/Buyer/BuyerApplyOffer";
import BuyerShippingandPayment from "./Components/Buyer/BuyerShippingandPayment";
import Orders from "./Components/OrderComponents/Orders";
import OrderDetails from "./Components/OrderComponents/OrderDetails";
import CreateScheme from "./Components/Salesman/CreateScheme";
import SalesmanProductDetails from "./Components/Salesman/SalesmanProductDetails";
import SalesmanCart from "./Components/Salesman/SalesmanCart";
import SalesmanApplyOffer from "./Components/Salesman/SalesmanApplyOffer";
import SchemeQR from "./Components/Salesman/SchemeQR";
import BuyerScanQR from "./Components/Buyer/BuyerScanQR";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/theme";
import BuyerAboutPage from "./Components/Buyer/BuyerAboutPage";
import BuyerContactPage from "./Components/Buyer/BuyerContactPage";
import CompletePayment from "./Components/CompletePayment";
import SubscriptionPercentage from "./Components/Admin/AdminSubscriptionComponents/SubscriptionPercentage";
import SubscriptionPlan from "./Components/Admin/AdminSubscriptionComponents/SubscriptionPlan";
import SubscriptionPercentageBills from "./Components/Admin/AdminSubscriptionComponents/SubscriptionPercentageBills";
import AdminBuyerVerify from "./Components/Admin/AdminAccountsComponents/AdminBuyerVerify";
import BuyerDetails from "./Components/Admin/AdminAccountsComponents/BuyerDetails";

function App() {
  const loginStatus = token() !== null;
  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus);
  const [isActive, setIsActive] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(isAdmin);
  const [isComplete, setIsComplete] = useState(true);
  const [showSidebar, setShowSidebar] = useState(loginStatus);

  const currUsr = decodeToken();
  const [user, setUser] = useState(currUsr);
  let usrData = {};
  // const navigate = useNavigate();

  const [f, sF] = useState(false);

  useEffect(() => {
    checkToken();
    const decodedUser = decodeToken();
    if (decodedUser) {
      setUser(decodedUser);
      setIsActive(decodedUser.isPaymentPending === "False");
    }
  }, [f]);

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const renderRedirects = () => {
    // console.log('kaha');
    if (isAdmin()) {
      // console.log('yaha');
      return <Navigate to="/admin/Home" />;
    } else if (isSalesman()) {
      return <Navigate to="/sales" />;
    } else if (isBuyer()) {
      return <Navigate to="/Home" />;
    } else if (isCompanySelf() || isCompanyAdmin()) {
      return <Navigate to="/company/Home" />;
    }
    return <Navigate to="/" />;
  };

  // useEffect(() => {
  //   // Redirect user if not active
  //   if (!isActive) {
  //     window.location.href = "/company/CompletePayment"; // Force redirection
  //   }
  // }, [isActive]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="bg-cyan-100 h-screen overflow-auto">
          {/* {(isLoggedIn && showSidebar) ? <Sidebar changeLogin={logout}  /> : ""} */}
          {/* {console.log(user?.isComplete === "True")} */}
          <Routes>
            <Route
              path="/"
              element={
                (isLoggedIn && user?.isComplete === "True") ? (
                  renderRedirects()
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn && user?.isComplete === "True" ? (
                  renderRedirects()
                ) : (
                  <Login changeLogin={setIsLoggedIn} sF={sF} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isLoggedIn ? (
                  <Navigate to="/company/Home" />
                ) : (
                  <Register changeLogin={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/company/CompletePayment"
              element={
                isLoggedIn ? (
                  <CompletePayment changeLogin={setIsLoggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {isActive && (
              <>
                <Route
                  path="/company/Home"
                  element={
                    isLoggedIn ? (
                      <Welcome
                        changeLogin={setIsLoggedIn}
                        setShowSidebar={setShowSidebar}
                      />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/complete-details"
                  element={
                    isLoggedIn ? (
                      <CompleteDetails
                        changeLogin={setIsLoggedIn}
                        setShowSidebar={setShowSidebar}
                      />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />

                <Route
                  path="/company/Product"
                  exact
                  element={
                    isLoggedIn ? (
                      <Product changeLogin={setIsLoggedIn} />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Product/:id"
                  exact
                  element={
                    isLoggedIn ? (
                      <ProductDetails changeLogin={setIsLoggedIn} />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Product/add"
                  exact
                  element={
                    isLoggedIn ? (
                      <>
                        <Sidebar changeLogin={logout} />
                        <AddProduct changeLogin={setIsLoggedIn} />
                      </>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Offer"
                  exact
                  element={
                    isLoggedIn ? (
                      <>
                        <Sidebar changeLogin={logout} />
                        <Offer changeLogin={setIsLoggedIn} />
                      </>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Offer/add"
                  exact
                  element={
                    isLoggedIn ? (
                      <>
                        <Sidebar changeLogin={logout} />
                        <AddOffer changeLogin={setIsLoggedIn} />
                      </>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Offer/:id"
                  exact
                  element={
                    isLoggedIn ? (
                      <>
                        <Sidebar changeLogin={logout} />
                        <OfferDetails changeLogin={setIsLoggedIn} />
                      </>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Order"
                  exact
                  element={
                    isLoggedIn ? (
                      <>
                        <Sidebar changeLogin={logout} />
                        <Orders changeLogin={setIsLoggedIn} />
                      </>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Order/:id"
                  exact
                  element={
                    isLoggedIn ? (
                      <>
                        <Sidebar changeLogin={logout} />
                        <OrderDetails changeLogin={setIsLoggedIn} />
                      </>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Division"
                  exact
                  element={
                    isLoggedIn ? (
                      <Division changeLogin={setIsLoggedIn} />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Group"
                  exact
                  element={
                    isLoggedIn ? (
                      <>
                        <Sidebar changeLogin={logout} />
                        <Group changeLogin={setIsLoggedIn} />
                      </>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Group/add"
                  exact
                  element={
                    isLoggedIn ? (
                      <>
                        <Sidebar changeLogin={logout} />
                        <AddGroup changeLogin={setIsLoggedIn} />
                      </>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Article"
                  exact
                  element={
                    isLoggedIn ? (
                      <Article changeLogin={setIsLoggedIn} />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Salesman"
                  exact
                  element={
                    isLoggedIn ? (
                      <Salesman changeLogin={setIsLoggedIn} />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Salesman/:id"
                  exact
                  element={
                    isLoggedIn ? (
                      <SalesmanDetail changeLogin={setIsLoggedIn} />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/company/Settings"
                  exact
                  element={
                    isLoggedIn ? (
                      <Settings changeLogin={setIsLoggedIn} />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
              </>
            )}
            <Route
              path="/admin"
              exact
              element={<AdminPage setIsAdminLoggedIn={setIsAdminLoggedIn} />}
            />
            <Route
              path="/admin/dashboard"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminLanding />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Company"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminCompanyVerify />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Company/:id"
              exact
              element={
                isAdminLoggedIn ? (
                  <CompanyDetails />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Buyer"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminBuyerVerify />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Buyer/:id"
              exact
              element={
                isAdminLoggedIn ? (
                  <BuyerDetails />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Product"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminProduct />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Product/:id"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminSellingProducts />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Product/:id/AddGroups"
              exact
              element={
                isAdminLoggedIn ? (
                  <AddProduct changeLogin={setIsAdminLoggedIn} />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Product/:id/View"
              exact
              element={
                isAdminLoggedIn ? (
                  <ProductDetails changeLogin={setIsAdminLoggedIn} />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Groups"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminGroups />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="admin/Groups/add"
              exact
              element={
                isLoggedIn ? (
                  <>
                    <AdminAddGroup changeLogin={setIsAdminLoggedIn} />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/admin/Orders"
              exact
              element={
                isAdminLoggedIn ? (
                  <>
                    <AdminSidebar changeLogin={logout} />
                    <Orders changeLogin={setIsAdminLoggedIn} />
                  </>
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Orders/:id"
              exact
              element={
                isAdminLoggedIn ? (
                  <>
                    <AdminSidebar changeLogin={logout} />
                    <OrderDetails changeLogin={setIsAdminLoggedIn} />
                  </>
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Article"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminArticles />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Offers"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminOffers />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Offers/add"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminAddOffers />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="admin/Offers/:id"
              exact
              element={
                isAdminLoggedIn ? (
                  <>
                    <AdminSidebar changeLogin={logout} />
                    <OfferDetails changeLogin={setIsAdminLoggedIn} />
                  </>
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Salesman"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminAddSalesman changeLogin={setIsAdminLoggedIn} />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Salesman/:id"
              exact
              element={
                isAdminLoggedIn ? (
                  <SalesmanDetail changeLogin={setIsAdminLoggedIn} />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/Settings"
              exact
              element={
                isAdminLoggedIn ? (
                  <AdminSettings changeLogin={setIsAdminLoggedIn} />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/SubscriptionPercentage"
              exact
              element={
                isAdminLoggedIn ? (
                  <SubscriptionPercentage changeLogin={setIsAdminLoggedIn} />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/SubscriptionPercentageBills"
              exact
              element={
                isAdminLoggedIn ? (
                  <SubscriptionPercentageBills
                    changeLogin={setIsAdminLoggedIn}
                  />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/SubscriptionPlan"
              exact
              element={
                isAdminLoggedIn ? (
                  <SubscriptionPlan changeLogin={setIsAdminLoggedIn} />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/sales"
              exact
              element={
                isLoggedIn ? (
                  <div className=" flex ">
                    <SalesmanSidebar changeLogin={setIsLoggedIn} />
                    <SalesmanLanding />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/sales/Product"
              exact
              element={
                isLoggedIn ? (
                  <>
                    <SalesmanSidebar changeLogin={setIsLoggedIn} />
                    <SalesmanProducts />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/sales/Product/:id"
              exact
              element={
                isLoggedIn ? (
                  <>
                    <SalesmanSidebar changeLogin={setIsLoggedIn} />
                    <ProductDetails changeLogin={setIsLoggedIn} />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/sales/Company"
              exact
              element={
                isLoggedIn ? (
                  <>
                    <SalesmanSidebar changeLogin={setIsLoggedIn} />
                    <SalesmanCompany />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/sales/Offers"
              exact
              element={
                isLoggedIn ? (
                  <>
                    <SalesmanSidebar changeLogin={setIsLoggedIn} />
                    <SalesmanOffers />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/sales/Scheme"
              exact
              element={
                isLoggedIn ? (
                  <>
                    <SalesmanSidebar changeLogin={setIsLoggedIn} />
                    <CreateScheme />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/sales/Scheme/:id"
              exact
              element={
                isLoggedIn ? (
                  <>
                    <SalesmanSidebar changeLogin={setIsLoggedIn} />
                    <SalesmanProductDetails />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/sales/Offers/:id"
              exact
              element={
                isLoggedIn ? (
                  <>
                    <SalesmanSidebar changeLogin={setIsLoggedIn} />
                    <OfferDetails />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/sales/Settings"
              exact
              element={
                isLoggedIn ? (
                  <>
                    <SalesmanSidebar changeLogin={setIsLoggedIn} />
                    <SalesmanSettings />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* <Route
              path="/Home"
              exact
              element={
                (() => isBuyer()) ? (
                  <>
                    <BuyerHome />
                  </>
                ) : (
                  <>
                    <Navigate to="/login" />
                  </>
                )
              }
            /> */}
            {isBuyer() && (
              <>
                {" "}
                <Route
                  path="/Home"
                  exact
                  element={
                    (() => isBuyer()) ? (
                      <>
                        <BuyerHome />
                      </>
                    ) : (
                      <>
                        <Navigate to="/login" />
                      </>
                    )
                  }
                />
                <Route
                  path="/Home/Scan"
                  exact
                  element={
                    (() => isBuyer()) ? (
                      <>
                        <BuyerScanQR />
                      </>
                    ) : (
                      <>
                        <Navigate to="/login" />
                      </>
                    )
                  }
                />
                <Route
                  path="/Home/About"
                  exact
                  element={
                    (() => isBuyer()) ? (
                      <>
                        <BuyerAboutPage />
                      </>
                    ) : (
                      <>
                        <Navigate to="/login" />
                      </>
                    )
                  }
                />
                <Route
                  path="/Home/Contact"
                  exact
                  element={
                    (() => isBuyer()) ? (
                      <>
                        <BuyerContactPage />
                      </>
                    ) : (
                      <>
                        <Navigate to="/login" />
                      </>
                    )
                  }
                />
                <Route
                  path="/Home/Products"
                  exact
                  element={
                    (() => isBuyer()) ? (
                      <>
                        <BuyerListing />
                      </>
                    ) : (
                      <>
                        <Navigate to="/login" />
                      </>
                    )
                  }
                />
                <Route
                  path="/Home/Products/:id"
                  exact
                  element={
                    (() => isBuyer()) ? (
                      <>
                        <BuyerProductDetails />
                      </>
                    ) : (
                      <>
                        <Navigate to="/login" />
                      </>
                    )
                  }
                />
                <Route
                  path="/Home/Cart"
                  exact
                  element={
                    (() => isBuyer()) ? (
                      <>
                        <BuyerCart />
                      </>
                    ) : (
                      <>
                        <Navigate to="/login" />
                      </>
                    )
                  }
                />
                <Route
                  path="/Home/Applyoffer"
                  exact
                  element={
                    (() => isBuyer()) ? (
                      <>
                        <BuyerApplyOffer />
                      </>
                    ) : (
                      <>
                        <Navigate to="/login" />
                      </>
                    )
                  }
                />
                <Route
                  path="/Home/OrderFromScheme"
                  exact
                  element={
                    (() => isBuyer()) ? (
                      <>
                        <BuyerApplyOffer />
                      </>
                    ) : (
                      <>
                        <Navigate to="/login" />
                      </>
                    )
                  }
                />
                <Route
                  path="/Home/Checkout"
                  exact
                  element={
                    (() => isBuyer()) ? (
                      <>
                        <BuyerShippingandPayment />
                      </>
                    ) : (
                      <>
                        <Navigate to="/login" />
                      </>
                    )
                  }
                />
              </>
            )}
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
