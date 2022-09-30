import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/services";
import { changeRegisterStatus } from "../../redux/auth/registerSlice";
import toast from "react-hot-toast";

function RegisterForm() {
  const { registerStatus, registerError } = useSelector(
    (state) => state.register
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (registerError && registerStatus === "failed") {
      toast.error(registerError, { duration: 1200 });
      dispatch(changeRegisterStatus());
    }
    if (!registerError && registerStatus === "succeeded") {
      navigate("/login");
    }
  }, [dispatch, registerError, registerStatus, navigate]);

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values) => {
        dispatch(registerUser(values));
      },
    });

  return (
    <form className="registerPageFormContainer" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        className="registerPageInput"
        placeholder="First name"
        onChange={handleChange}
        value={values.firstName}
        onBlur={handleBlur}
      />
      {errors.firstName && touched.firstName && (
        <div className="text-red-600 text-xs">{errors.firstName}</div>
      )}
      <input
        type="text"
        name="lastName"
        className="registerPageInput"
        placeholder="Last name"
        onChange={handleChange}
        value={values.lastName}
        onBlur={handleBlur}
      />
      {errors.lastName && touched.lastName && (
        <div className="text-red-600 text-xs">{errors.lastName}</div>
      )}
      <input
        type="text"
        name="email"
        className="registerPageInput"
        placeholder="Enter email"
        onChange={handleChange}
        value={values.email}
        onBlur={handleBlur}
      />
      {errors.email && touched.email && (
        <div className="text-red-600 text-xs">{errors.email}</div>
      )}
      <input
        type="password"
        name="password"
        className="registerPageInput"
        placeholder="Enter password"
        onChange={handleChange}
        value={values.password}
        onBlur={handleBlur}
      />
      {errors.password && touched.password && (
        <div className="text-red-600 text-xs">{errors.password}</div>
      )}
      <button type="submit" className="registerPageSignUpButton">
        Sign up
      </button>
    </form>
  );
}

export default RegisterForm;
