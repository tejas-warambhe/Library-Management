import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Books from "./components/Books";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Student from "./components/Student";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  };

  async function verifyAuth() {
    try {
      const response = await fetch(
        "http://localhost:5000/auth/verify",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      console.log(parseRes);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    verifyAuth();
  }, []);
  return (
    <>
      <Router>
        <Navbar setAuth={setAuth} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/students" />
              )
            }
          />
          <Route
            exact
            path="/register"
            element={
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            exact
            path="/students"
            element={
              isAuthenticated ? (
                <Student setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            exact
            path="/books"
            element={
              isAuthenticated ? (
                <Books setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
