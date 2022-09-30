import React from "react";
import { Toaster } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";

function Login() {
  const { user } = useSelector((state) => state.login);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="loginPageContainer">
      <Toaster />
      <div className="loginPageContent">
        <h1 className="loginPageTitle">Hello Again!</h1>
        <h2 className="loginPageSecondTitle">
          Welcome to Task Management Tool app <br /> login to your account
        </h2>
        <LoginForm />
        <div className="loginPageThirdTitle">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="loginPageSignInText">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
