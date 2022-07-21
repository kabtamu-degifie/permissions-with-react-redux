import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textbox from "../../components/form/Textbox";
import { MdAppRegistration } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../services/Register/user.slice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required().label("Username"),
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required()
      .label("Repeat Password"),
  });

  const handleSubmit = (values) => {
    const { username, email, password } = values;
    dispatch(register({ username, email, password }));
    dispatch(reset());
  };

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess && user) {
      navigate("/");
    }
  }, [user, isLoading, isSuccess, isError, message, navigate]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="grid grid-cols-1 items-center gap-2">
          <h1 className="inline-flex justify-center font-semibold text-3xl text-center">
            <MdAppRegistration className="mr-2" /> Register new user
          </h1>

          <Textbox
            type="text"
            name="username"
            label="Username"
            placeholder="Username"
          />

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

          <Textbox
            type="password"
            name="repeatPassword"
            label="Repeat Password"
            placeholder="Repeat Password"
          />
          <button
            type="submit"
            className="text-white bg-indigo-700 p-2 rounded-md"
          >
            Register
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default Register;
