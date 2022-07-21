import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../ui/TextError";

function Textbox(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="w-auto flex-col items-center">
      <div>
        <label className="font-bold" htmlFor={name}>
          {label}
        </label>
      </div>

      <div className="mt-2 mb-2">
        <Field
          className="w-96 px-2 py-2 text-lg border-gray-400 rounded-md border-2"
          id={name}
          name={name}
          {...rest}
        />
      </div>

      <div className="mb-2">
        <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
}

export default Textbox;
