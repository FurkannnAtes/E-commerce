import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FacebookLogin from "react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
const SignUpForm = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Please do not leave any spaces in the form."),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Please do not leave any spaces in the form."),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please do not leave any spaces in the form."),
      password: Yup.string()
        .min(8, "Minimun be 8 characters")
        .required("Please do not leave any spaces in the form."),
    }),
    onSubmit: (values) => {},
  });
  return (
    <form
      className="flex flex-col gap-2 border p-2 shadow-md bg-lightGray "
      onSubmit={formik.handleSubmit}
    >
      <div className="text-3xl font-semibold ">Sing Up</div>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
        className="h-[40px] outline-none"
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className="text-red-400">{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
        className="h-[40px] outline-none"
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className="text-red-400">{formik.errors.lastName}</div>
      ) : null}

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
          <button
            type="button"
            className="h-10 bg-white border rounded-md w-full flex items-center gap-2 justify-center text-lg font-semibold"
            onClick={() => login()}
          >
            Sign in with Google
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-white">
              <FcGoogle />
            </div>
          </button>
        </div>
        <div className="h-10 overflow-hidden rounded-md flex items-center w-fit relative">
          <FacebookLogin
            appId={import.meta.env.VITE_FACE_APP_ID}
            autoLoad={true}
            fields="name,email,picture"
            className="kep-login-facebook"
            callback={responseFacebook}
            textButton="Sign in with Facebook"
          ></FacebookLogin>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 text-white">
            <FaFacebookF />
          </div>
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
