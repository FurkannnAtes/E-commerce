import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { GoogleLogin } from "@react-oauth/google";

import { useDispatch, useSelector } from "react-redux";
import { googleAuth, login } from "@/store/auth";
import { client } from "@/utils/client";
import { ImSpinner2 } from "react-icons/im";

//TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = () => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
      setisLoading(true);
      const query = `*[_type == "user" && email == "${values.email}"][0]`;
      const res = await client.fetch(query);
      if (res === null) {
      } else {
        await dispatch(
          login({
            email: values.email,
            password: values.password,
            res: res,
          })
        );
      }

      if (!user.userName) {
        error("Email or password is incorrect");
      }
      setisLoading(false);
    },
  });
  const error = (message) => toast.error(message);
  return (
    <form
      className="flex flex-col gap-2 border p-2 shadow-md bg-lightGray "
      onSubmit={formik.handleSubmit}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        className="bg-[#27C007] text-white font-semibold text-lg p-2 flex items-center justify-center h-[40px]"
        type="submit"
      >
        {isLoading ? <ImSpinner2 className="animate-spin" /> : "Sing Up "}
      </button>
    </form>
  );
};

export default SignUpForm;
