import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <div className="registerPageContainer">
      <Toaster />
      <div className="registerPageContent">
        <h1 className="registerPageTitle">Sign Up</h1>
        <h2 className="registerPageSecondTitle">
          Welcome to Task Management Tool app <br /> sign up to get started
        </h2>
        <RegisterForm />
        <div className="registerPageThirdTitle">
          All ready a user?{" "}
          <Link to="/login">
            <span className="registerPageSignInText">Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
