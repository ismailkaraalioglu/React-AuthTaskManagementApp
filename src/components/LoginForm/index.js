import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/services";
import { changeLoginStatus } from "../../redux/auth/loginSlice";

function LoginForm() {
  const { loginStatus, loginError } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginError !== null && loginStatus === "failed") {
      toast.error(loginError, { duration: 1200 });
      dispatch(changeLoginStatus());
    }
    if (loginError === null && loginStatus === "succeeded") {
      navigate("/");
    }
  }, [dispatch, loginError, loginStatus, navigate]);

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values) => {
        const { email, password } = values;
        dispatch(loginUser({ email, password }));
      },
    });

  return (
    <form className="loginPageFormContainer" onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        className="loginPageInput"
        placeholder="Enter email"
        onChange={handleChange}
        value={values.email}
        onBlur={handleBlur}
      />
      {errors.email && touched.email && (
        <div className="text-red-600 text-sm">{errors.email}</div>
      )}
      <input
        type="password"
        name="password"
        className="loginPageInput"
        placeholder="Enter password"
        onChange={handleChange}
        value={values.password}
        onBlur={handleBlur}
      />
      {errors.password && touched.password && (
        <div className="text-red-600 text-sm">{errors.password}</div>
      )}
      <button type="submit" className="loginPageLoginButton">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
