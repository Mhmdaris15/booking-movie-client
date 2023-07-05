import React from "react";
import Logo from "../assets/movie-48.png";
import { Formik, Form, useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const tmp = values;
    values = {
      email: tmp.email,
      password: tmp.password,
    };
    try {
      const response = await axios.post("http://localhost:3000/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log("Error Axios Found : ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6  py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to={"/"}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src={Logo}
            alt="logo"
          />
          NEVTIK CINEMA
        </Link>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Log in
        </h1>
        <div
          className="w-full rounded-lg md:mt-0
          sm:max-w-xl xl:p-0 ">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}>
            {({
              isSubmitting,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
            }) => (
              <Form className="space-y-4 md:space-y-6 ">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>

                  <Field
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                  <ErrorMessage
                    name="email"
                    className="text-red-700 font-bold text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    name="password"
                    className="text-red-700 font-bold text-sm"
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
