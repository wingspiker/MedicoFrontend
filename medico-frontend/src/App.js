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
import { Sidebar } from "./Components/SafeComponents/Sidebar";
import { decodeToken, signOut, token } from "./Services/auth";
import CompleteDetails from "./Components/CompleteDetails";
import AddOffer from "./Components/OfferComponents/AddOffer";
import Offer from "./Components/OfferComponents/Offers";

function App() {
  const loginStatus = token() !== null;
  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus);
  const [showSidebar, setShowSidebar] = useState(loginStatus);
  // console.log(showSidebar, isLoggedIn);

  const currUsr = decodeToken()
  const [user, setUser] = useState(currUsr)

  const logout = () => {
    signOut();
    setIsLoggedIn(false)
  };
  
  return (
    <Router>
      <div className="bg-gray-100 h-screen">
        {(isLoggedIn && showSidebar) ? <Sidebar changeLogin={logout}  /> : ""}

        <Routes>
          {isLoggedIn && (
            <>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/login" element={<Navigate to="/Home" />} />
              <Route path="/register" element={<Navigate to="/Home" />} />
            </>
          )}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login changeLogin={setIsLoggedIn} setShowSidebar={setShowSidebar} />}
          />
          {/* Protected Route: Only logged-in users can access the Welcome page */}

          <Route
            path="/Home"
            element={
              isLoggedIn ? (
                <Welcome changeLogin={setIsLoggedIn} setShowSidebar={setShowSidebar} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/complete-details"
            element={
              isLoggedIn ? (
                <CompleteDetails changeLogin={setIsLoggedIn} setShowSidebar={setShowSidebar}/>
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
            path="/Product/add"
            exact
            element={
              isLoggedIn ? (
                <AddProduct changeLogin={setIsLoggedIn} />
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
                <Offer changeLogin={setIsLoggedIn} />
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
                <AddOffer changeLogin={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
