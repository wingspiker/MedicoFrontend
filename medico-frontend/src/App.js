import React, { useState } from "react";
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
  decodeToken,
  formdata,
  isAdmin,
  isBuyer,
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

function App() {
  const loginStatus = token() !== null;
  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus);
  // const [isBuyerLoggedIn, setIsBuyerLoggedIn] = useState(loginStatus);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(isAdmin);
  // console.log(isAdminLoggedIn);
  const [isComplete, setIsComplete] = useState(true);
  const [showSidebar, setShowSidebar] = useState(loginStatus);
  // console.log(showSidebar, isLoggedIn);

  const currUsr = decodeToken();
  const [user, setUser] = useState(currUsr);
  let usrData = {};

  if (user) {
    const keys = Object.keys(user);
    const role = keys.find((claim) => claim.endsWith("role"));
    const email = keys.find((claim) => claim.endsWith("emailaddress"));
    usrData.role = role;
    usrData.email = email;
  }

  const logout = () => {
    signOut();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="bg-cyan-900 h-screen overflow-auto">
        {/* {(isLoggedIn && showSidebar) ? <Sidebar changeLogin={logout}  /> : ""} */}

        <Routes>
          {isLoggedIn && user?.isComplete === "True" && (
            <>
              <Route
                path="/"
                element={
                  isAdmin() ? (
                    <Navigate to="/admin/Home" />
                  ) : isSalesman() ? (
                    <Navigate to="/sales" />
                  ) : isBuyer() ? (
                    <Navigate to="/Home" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  isAdmin() ? (
                    <Navigate to="/admin/Home" />
                  ) : isSalesman() ? (
                    <Navigate to="/sales" />
                  ) : isBuyer() ? (
                    <Navigate to="/Home" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/register"
                element={<Navigate to="/company/Home" />}
              />
            </>
          )}
          <Route path="/" element={<Home />} />
          {isLoggedIn ? (
            <>
              {setCurrStep(3)}
              {usrData.role &&
                setFormData({ ...formdata, role: user[usrData.role] })}
              {usrData.email &&
                setFormData({ ...formdata, email: user[usrData.email] })}

              <Route
                path="/register"
                element={
                  <Register
                    changeLogin={setIsLoggedIn}
                    setShowSidebar={setShowSidebar}
                    setIsComplete={setIsComplete}
                  />
                }
              />
            </>
          ) : (
            <Route
              path="/register"
              element={
                <Register
                  changeLogin={setIsLoggedIn}
                  setShowSidebar={setShowSidebar}
                  setIsComplete={setIsComplete}
                />
              }
            />
          )}
          <Route
            path="/login"
            element={
              <Login
                changeLogin={setIsLoggedIn}
                setShowSidebar={setShowSidebar}
              />
            }
          />
          {/* Protected Route: Only logged-in users can access the Welcome page */}
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
                <AdminLanding />
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
            path="/sales/Cart"
            exact
            element={
              isLoggedIn ? (
                <>
                  <SalesmanSidebar changeLogin={setIsLoggedIn} />
                  <SalesmanCart />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/sales/Applyoffer"
            exact
            element={
              isLoggedIn ? (
                <>
                  <SalesmanSidebar changeLogin={setIsLoggedIn} />
                  <SalesmanApplyOffer />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/sales/schemeQR"
            exact
            element={
              isLoggedIn ? (
                <>
                  <SalesmanSidebar changeLogin={setIsLoggedIn} />
                  <SchemeQR />
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

          <Route path="*" exact element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
