import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { GoogleLogin } from "@react-oauth/google";

import { useDispatch } from "react-redux";
import { googleAuth, login } from "@/store/auth";
import { client } from "@/utils/client";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please do not leave any spaces in the form."),
      password: Yup.string()
        .min(8, "Minimun be 8 characters")
        .required("Please do not leave any spaces in the form."),
    }),
    onSubmit: async (values) => {
      const query = `*[_type == "user" && email == "${values.email}"][0]`;
      const res = await client.fetch(query);
      await dispatch(
        login({
          email: values.email,
          password: values.password,
          res: res,
        })
      );
    },
  });
  return (
    <form
      className="flex flex-col gap-2 border p-2 shadow-md bg-lightGray "
      onSubmit={formik.handleSubmit}
    >
      <div className="text-3xl font-semibold ">Sing Up</div>

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className="h-[40px] outline-none"
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-red-400">{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className="h-[40px] outline-none"
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-red-400">{formik.errors.password}</div>
      ) : null}
      <div className="flex items-center gap-2 ">
        <div className="h-[1px] w-full bg-black"></div>
        <div className="text-md font-semibold text-gray-400">OR</div>
        <div className="h-[1px] w-full bg-black"></div>
      </div>
      <div className="flex flex-col  gap-2">
        <div className="relative">
          <GoogleLogin
            width="300"
            onSuccess={(credentialResponse) => {
              dispatch(googleAuth(credentialResponse));
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
      <button
        className="bg-[#27C007] text-white font-semibold text-lg p-2"
        type="submit"
      >
        Sing Up
      </button>
    </form>
  );
};

export default SignUpForm;
