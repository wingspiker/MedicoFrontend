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
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Welcome from "./Components/Welcome";
import Product from "./Components/SafeComponents/Product";
import AddProduct from "./Components/SafeComponents/AddProduct";
import {
  decodeToken,
  formdata,
  isAdmin,
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

function App() {
  const loginStatus = token() !== null;
  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus);
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
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/login" element={<Navigate to="/Home" />} />
              <Route path="/register" element={<Navigate to="/Home" />} />
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
            path="/Home"
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
            path="/Product"
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
            path="/Product/:id"
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
            path="/Product/add"
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
            path="/Offer"
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
            path="/Offer/add"
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
            path="/Division"
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
            path="/Group"
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
            path="/Group/add"
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
            path="/Article"
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
            path="/Salesman"
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
