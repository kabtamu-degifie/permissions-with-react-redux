import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textbox from "../../components/form/Textbox";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
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
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="grid grid-cols-1 items-center gap-2">
          <h1 className="inline-flex justify-center font-semibold text-3xl text-center">
            <FaSignInAlt className="mr-2" /> Login
          </h1>

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
