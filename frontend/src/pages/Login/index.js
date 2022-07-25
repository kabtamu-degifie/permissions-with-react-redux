import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textbox from "../../components/form/Textbox";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../services/Auth/user.slice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });

  const handleSubmit = (values) => {
    const { email, password } = values;
    dispatch(login({ email, password }));
  };

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(reset());
      navigate(location.state ? location.state : "/");
    }
  }, [
    user,
    location,
    isLoading,
    isSuccess,
    isError,
    message,
    navigate,
    dispatch,
  ]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="grid grid-cols-1 items-center gap-2">
          <h1 className="inline-flex justify-center items-center font-semibold text-3xl text-center">
            <FaSignInAlt className="mr-2" /> Login
          </h1>

          {isError ? (
            <p className="text-red-600 text-center">{message}</p>
          ) : null}

          <Textbox
            type="email"
            name="email"
            label="Email"
            placeholder="Email Address"
          />

          <Textbox
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
          />

          <button
            type="submit"
            className="text-white bg-indigo-700 p-2 rounded-md"
          >
            Login
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default Login;
