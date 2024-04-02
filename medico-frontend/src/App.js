import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="bg-gray-100 h-screen">
        {isLoggedIn ? <Sidebar changeLogin={setIsLoggedIn} /> : ""}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login changeLogin={setIsLoggedIn} />}
          />
          {/* Protected Route: Only logged-in users can access the Welcome page */}
          <Route
            path="/Home"
            element={
              isLoggedIn ? (
                <Welcome changeLogin={setIsLoggedIn} />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
